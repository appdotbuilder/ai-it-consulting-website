import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { seedCaseStudies } from './seed_case_studies';

export const checkAndSeedCaseStudies = async (): Promise<void> => {
  try {
    // Check if case studies table is empty
    const existingCaseStudies = await db.select()
      .from(caseStudiesTable)
      .limit(1)
      .execute();

    if (existingCaseStudies.length === 0) {
      console.log('Case studies table is empty. Seeding with initial data...');
      const result = await seedCaseStudies();
      console.log(`✅ ${result.message} - ${result.count} case studies added`);
    } else {
      console.log('Case studies table already has data. Skipping seed operation.');
    }
  } catch (error) {
    console.error('Error checking/seeding case studies:', error);
    // Don't throw error to prevent server startup failure
  }
};