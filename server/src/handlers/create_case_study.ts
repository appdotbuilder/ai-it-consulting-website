import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CreateCaseStudyInput, type CaseStudy } from '../schema';

export const createCaseStudy = async (input: CreateCaseStudyInput): Promise<CaseStudy> => {
  try {
    // Insert case study record
    const result = await db.insert(caseStudiesTable)
      .values({
        title: input.title,
        slug: input.slug,
        client_name: input.client_name,
        industry: input.industry,
        problem_description: input.problem_description,
        solution_description: input.solution_description,
        results_description: input.results_description,
        image_url: input.image_url,
        technologies_used: input.technologies_used,
        is_featured: input.is_featured
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Case study creation failed:', error);
    throw error;
  }
};