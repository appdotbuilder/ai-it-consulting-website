import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CaseStudy } from '../schema';
import { desc } from 'drizzle-orm';

export const getAllCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const result = await db.select()
      .from(caseStudiesTable)
      .orderBy(desc(caseStudiesTable.created_at))
      .execute();

    return result.map(caseStudy => ({
      ...caseStudy,
      technologies_used: caseStudy.technologies_used as string[] // JSON field type assertion
    }));
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    throw error;
  }
};