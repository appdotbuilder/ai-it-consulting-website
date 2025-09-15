import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { teamMembersTable } from '../db/schema';
import { type CreateTeamMemberInput } from '../schema';
import { createTeamMember } from '../handlers/create_team_member';
import { eq } from 'drizzle-orm';

// Complete test input with all fields
const testInput: CreateTeamMemberInput = {
  name: 'John Doe',
  position: 'Senior Developer',
  bio: 'Experienced full-stack developer with expertise in TypeScript and React.',
  avatar_url: 'https://example.com/avatar.jpg',
  linkedin_url: 'https://linkedin.com/in/johndoe',
  twitter_url: 'https://twitter.com/johndoe',
  display_order: 1,
  is_active: true
};

// Minimal test input with only required fields
const minimalInput: CreateTeamMemberInput = {
  name: 'Jane Smith',
  position: 'Designer',
  bio: 'Creative UI/UX designer.',
  avatar_url: null,
  linkedin_url: null,
  twitter_url: null,
  display_order: 0,
  is_active: true
};

describe('createTeamMember', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a team member with all fields', async () => {
    const result = await createTeamMember(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.position).toEqual('Senior Developer');
    expect(result.bio).toEqual('Experienced full-stack developer with expertise in TypeScript and React.');
    expect(result.avatar_url).toEqual('https://example.com/avatar.jpg');
    expect(result.linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(result.twitter_url).toEqual('https://twitter.com/johndoe');
    expect(result.display_order).toEqual(1);
    expect(result.is_active).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a team member with minimal fields', async () => {
    const result = await createTeamMember(minimalInput);

    // Basic field validation
    expect(result.name).toEqual('Jane Smith');
    expect(result.position).toEqual('Designer');
    expect(result.bio).toEqual('Creative UI/UX designer.');
    expect(result.avatar_url).toBeNull();
    expect(result.linkedin_url).toBeNull();
    expect(result.twitter_url).toBeNull();
    expect(result.display_order).toEqual(0);
    expect(result.is_active).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save team member to database', async () => {
    const result = await createTeamMember(testInput);

    // Query using proper drizzle syntax
    const teamMembers = await db.select()
      .from(teamMembersTable)
      .where(eq(teamMembersTable.id, result.id))
      .execute();

    expect(teamMembers).toHaveLength(1);
    expect(teamMembers[0].name).toEqual('John Doe');
    expect(teamMembers[0].position).toEqual('Senior Developer');
    expect(teamMembers[0].bio).toEqual('Experienced full-stack developer with expertise in TypeScript and React.');
    expect(teamMembers[0].avatar_url).toEqual('https://example.com/avatar.jpg');
    expect(teamMembers[0].linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(teamMembers[0].twitter_url).toEqual('https://twitter.com/johndoe');
    expect(teamMembers[0].display_order).toEqual(1);
    expect(teamMembers[0].is_active).toEqual(true);
    expect(teamMembers[0].created_at).toBeInstanceOf(Date);
    expect(teamMembers[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle default values correctly', async () => {
    // Test input using Zod defaults
    const inputWithDefaults: CreateTeamMemberInput = {
      name: 'Default Member',
      position: 'Default Position',
      bio: 'Default bio.',
      avatar_url: null,
      linkedin_url: null,
      twitter_url: null,
      display_order: 0, // Default value from Zod schema
      is_active: true    // Default value from Zod schema
    };

    const result = await createTeamMember(inputWithDefaults);

    expect(result.display_order).toEqual(0);
    expect(result.is_active).toEqual(true);
    expect(result.avatar_url).toBeNull();
    expect(result.linkedin_url).toBeNull();
    expect(result.twitter_url).toBeNull();
  });

  it('should create multiple team members with different display orders', async () => {
    const member1 = { ...testInput, name: 'Member 1', display_order: 1 };
    const member2 = { ...testInput, name: 'Member 2', display_order: 2 };
    const member3 = { ...testInput, name: 'Member 3', display_order: 0 };

    const result1 = await createTeamMember(member1);
    const result2 = await createTeamMember(member2);
    const result3 = await createTeamMember(member3);

    expect(result1.display_order).toEqual(1);
    expect(result2.display_order).toEqual(2);
    expect(result3.display_order).toEqual(0);

    // Verify all are saved to database
    const allMembers = await db.select()
      .from(teamMembersTable)
      .execute();

    expect(allMembers).toHaveLength(3);
    expect(allMembers.map(m => m.name)).toContain('Member 1');
    expect(allMembers.map(m => m.name)).toContain('Member 2');
    expect(allMembers.map(m => m.name)).toContain('Member 3');
  });

  it('should handle inactive team members', async () => {
    const inactiveInput = { ...testInput, is_active: false };
    const result = await createTeamMember(inactiveInput);

    expect(result.is_active).toEqual(false);

    const savedMember = await db.select()
      .from(teamMembersTable)
      .where(eq(teamMembersTable.id, result.id))
      .execute();

    expect(savedMember[0].is_active).toEqual(false);
  });
});