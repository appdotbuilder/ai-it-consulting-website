import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CaseStudy } from '../schema';
import { eq, desc } from 'drizzle-orm';

export const getFeaturedCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const result = await db.select()
      .from(caseStudiesTable)
      .where(eq(caseStudiesTable.is_featured, true))
      .orderBy(desc(caseStudiesTable.created_at))
      .execute();

    return result;
  } catch (error) {
    console.error('Failed to fetch featured case studies:', error);
    throw error;
  }
};