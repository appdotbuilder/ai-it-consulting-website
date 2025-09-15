import { db } from '../db';
import { teamMembersTable } from '../db/schema';
import { eq, asc } from 'drizzle-orm';
import { type TeamMember } from '../schema';

export const getActiveTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const results = await db.select()
      .from(teamMembersTable)
      .where(eq(teamMembersTable.is_active, true))
      .orderBy(asc(teamMembersTable.display_order))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch active team members:', error);
    throw error;
  }
};