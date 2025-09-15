import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { teamMembersTable } from '../db/schema';
import { type CreateTeamMemberInput } from '../schema';
import { getActiveTeamMembers } from '../handlers/get_active_team_members';

// Test team member data
const testTeamMembers: CreateTeamMemberInput[] = [
  {
    name: 'John Doe',
    position: 'CEO',
    bio: 'Visionary leader with 15 years of experience.',
    avatar_url: 'https://example.com/john.jpg',
    linkedin_url: 'https://linkedin.com/in/johndoe',
    twitter_url: 'https://twitter.com/johndoe',
    display_order: 1,
    is_active: true
  },
  {
    name: 'Jane Smith',
    position: 'CTO',
    bio: 'Technical expert and innovation driver.',
    avatar_url: 'https://example.com/jane.jpg',
    linkedin_url: 'https://linkedin.com/in/janesmith',
    twitter_url: null,
    display_order: 2,
    is_active: true
  },
  {
    name: 'Bob Wilson',
    position: 'Senior Developer',
    bio: 'Full-stack developer with passion for clean code.',
    avatar_url: null,
    linkedin_url: null,
    twitter_url: null,
    display_order: 3,
    is_active: false // Inactive member
  },
  {
    name: 'Alice Johnson',
    position: 'Designer',
    bio: 'Creative designer with eye for detail.',
    avatar_url: 'https://example.com/alice.jpg',
    linkedin_url: 'https://linkedin.com/in/alicejohnson',
    twitter_url: 'https://twitter.com/alicejohnson',
    display_order: 0, // Should appear first
    is_active: true
  }
];

describe('getActiveTeamMembers', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no team members exist', async () => {
    const result = await getActiveTeamMembers();
    
    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return only active team members', async () => {
    // Insert test data
    await db.insert(teamMembersTable)
      .values(testTeamMembers)
      .execute();

    const result = await getActiveTeamMembers();

    expect(result).toHaveLength(3); // Only active members
    
    // Verify no inactive members are returned
    const inactiveMembers = result.filter(member => !member.is_active);
    expect(inactiveMembers).toHaveLength(0);

    // Verify all returned members are active
    result.forEach(member => {
      expect(member.is_active).toBe(true);
    });
  });

  it('should order team members by display_order ascending', async () => {
    // Insert test data
    await db.insert(teamMembersTable)
      .values(testTeamMembers)
      .execute();

    const result = await getActiveTeamMembers();

    // Expected order by display_order: Alice (0), John (1), Jane (2)
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Alice Johnson');
    expect(result[0].display_order).toBe(0);
    expect(result[1].name).toBe('John Doe');
    expect(result[1].display_order).toBe(1);
    expect(result[2].name).toBe('Jane Smith');
    expect(result[2].display_order).toBe(2);
  });

  it('should return all team member fields correctly', async () => {
    // Insert single test member
    await db.insert(teamMembersTable)
      .values([testTeamMembers[0]])
      .execute();

    const result = await getActiveTeamMembers();

    expect(result).toHaveLength(1);
    const member = result[0];

    // Verify all fields are present and correct
    expect(member.id).toBeDefined();
    expect(member.name).toBe('John Doe');
    expect(member.position).toBe('CEO');
    expect(member.bio).toBe('Visionary leader with 15 years of experience.');
    expect(member.avatar_url).toBe('https://example.com/john.jpg');
    expect(member.linkedin_url).toBe('https://linkedin.com/in/johndoe');
    expect(member.twitter_url).toBe('https://twitter.com/johndoe');
    expect(member.display_order).toBe(1);
    expect(member.is_active).toBe(true);
    expect(member.created_at).toBeInstanceOf(Date);
    expect(member.updated_at).toBeInstanceOf(Date);
  });

  it('should handle nullable fields correctly', async () => {
    // Insert member with null values
    const memberWithNulls: CreateTeamMemberInput = {
      name: 'Test Member',
      position: 'Test Position',
      bio: 'Test bio',
      avatar_url: null,
      linkedin_url: null,
      twitter_url: null,
      display_order: 0,
      is_active: true
    };

    await db.insert(teamMembersTable)
      .values([memberWithNulls])
      .execute();

    const result = await getActiveTeamMembers();

    expect(result).toHaveLength(1);
    const member = result[0];

    expect(member.avatar_url).toBeNull();
    expect(member.linkedin_url).toBeNull();
    expect(member.twitter_url).toBeNull();
  });

  it('should handle members with same display_order consistently', async () => {
    // Insert members with same display_order
    const sameOrderMembers: CreateTeamMemberInput[] = [
      {
        name: 'Member A',
        position: 'Position A',
        bio: 'Bio A',
        avatar_url: null,
        linkedin_url: null,
        twitter_url: null,
        display_order: 5,
        is_active: true
      },
      {
        name: 'Member B',
        position: 'Position B',
        bio: 'Bio B',
        avatar_url: null,
        linkedin_url: null,
        twitter_url: null,
        display_order: 5,
        is_active: true
      }
    ];

    await db.insert(teamMembersTable)
      .values(sameOrderMembers)
      .execute();

    const result = await getActiveTeamMembers();

    expect(result).toHaveLength(2);
    // Both should have the same display_order
    expect(result[0].display_order).toBe(5);
    expect(result[1].display_order).toBe(5);
  });
});