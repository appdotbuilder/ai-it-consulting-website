import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type CaseStudy } from '../schema';

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | null> => {
  try {
    const result = await db.select()
      .from(caseStudiesTable)
      .where(eq(caseStudiesTable.slug, slug))
      .limit(1)
      .execute();

    if (result.length === 0) {
      return null;
    }

    const caseStudy = result[0];
    return {
      ...caseStudy,
      technologies_used: caseStudy.technologies_used as string[] // JSON field type assertion
    };
  } catch (error) {
    console.error('Failed to get case study by slug:', error);
    throw error;
  }
};