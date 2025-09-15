import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CreateCaseStudyInput } from '../schema';
import { getAllCaseStudies } from '../handlers/get_all_case_studies';

// Test data for case studies
const testCaseStudy1: CreateCaseStudyInput = {
  title: 'E-commerce Platform Redesign',
  slug: 'ecommerce-platform-redesign',
  client_name: 'TechCorp Solutions',
  industry: 'E-commerce',
  problem_description: 'Outdated user interface and poor conversion rates',
  solution_description: 'Complete redesign with modern UX principles',
  results_description: 'Increased conversion rates by 45% and user engagement by 60%',
  image_url: 'https://example.com/case-study-1.jpg',
  technologies_used: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  is_featured: true
};

const testCaseStudy2: CreateCaseStudyInput = {
  title: 'Mobile App Development',
  slug: 'mobile-app-development',
  client_name: 'StartupInc',
  industry: 'FinTech',
  problem_description: 'Need for cross-platform mobile solution',
  solution_description: 'Built native mobile apps for iOS and Android',
  results_description: 'Successfully launched with 10K+ downloads in first month',
  image_url: null,
  technologies_used: ['React Native', 'Firebase', 'Redux'],
  is_featured: false
};

const testCaseStudy3: CreateCaseStudyInput = {
  title: 'API Integration Platform',
  slug: 'api-integration-platform',
  client_name: 'Enterprise Ltd',
  industry: 'Enterprise Software',
  problem_description: 'Complex legacy system integrations',
  solution_description: 'Built comprehensive API integration platform',
  results_description: 'Reduced integration time by 70% and improved data accuracy',
  image_url: 'https://example.com/case-study-3.jpg',
  technologies_used: ['Python', 'FastAPI', 'Docker', 'Kubernetes'],
  is_featured: true
};

describe('getAllCaseStudies', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no case studies exist', async () => {
    const result = await getAllCaseStudies();
    
    expect(result).toEqual([]);
  });

  it('should return all case studies ordered by created_at desc', async () => {
    // Insert test data in a specific order
    await db.insert(caseStudiesTable).values(testCaseStudy1).execute();
    
    // Add small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));
    
    await db.insert(caseStudiesTable).values(testCaseStudy2).execute();
    
    await new Promise(resolve => setTimeout(resolve, 10));
    
    await db.insert(caseStudiesTable).values(testCaseStudy3).execute();

    const result = await getAllCaseStudies();

    expect(result).toHaveLength(3);
    
    // Should be ordered by created_at desc (newest first)
    expect(result[0].title).toEqual('API Integration Platform');
    expect(result[1].title).toEqual('Mobile App Development');
    expect(result[2].title).toEqual('E-commerce Platform Redesign');
    
    // Verify all fields are present and correct
    expect(result[0].client_name).toEqual('Enterprise Ltd');
    expect(result[0].industry).toEqual('Enterprise Software');
    expect(result[0].technologies_used).toEqual(['Python', 'FastAPI', 'Docker', 'Kubernetes']);
    expect(result[0].is_featured).toBe(true);
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
    expect(result[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle single case study correctly', async () => {
    await db.insert(caseStudiesTable).values(testCaseStudy1).execute();

    const result = await getAllCaseStudies();

    expect(result).toHaveLength(1);
    expect(result[0].title).toEqual('E-commerce Platform Redesign');
    expect(result[0].slug).toEqual('ecommerce-platform-redesign');
    expect(result[0].client_name).toEqual('TechCorp Solutions');
    expect(result[0].problem_description).toEqual('Outdated user interface and poor conversion rates');
    expect(result[0].solution_description).toEqual('Complete redesign with modern UX principles');
    expect(result[0].results_description).toEqual('Increased conversion rates by 45% and user engagement by 60%');
    expect(result[0].technologies_used).toEqual(['React', 'TypeScript', 'Node.js', 'PostgreSQL']);
    expect(result[0].is_featured).toBe(true);
  });

  it('should handle case studies with null image_url correctly', async () => {
    await db.insert(caseStudiesTable).values(testCaseStudy2).execute();

    const result = await getAllCaseStudies();

    expect(result).toHaveLength(1);
    expect(result[0].image_url).toBeNull();
    expect(result[0].is_featured).toBe(false);
  });

  it('should verify chronological ordering with multiple case studies', async () => {
    // Create case studies with distinct timestamps
    const now = new Date();
    
    // First case study (oldest)
    const oldest = await db.insert(caseStudiesTable)
      .values({
        ...testCaseStudy1,
        created_at: new Date(now.getTime() - 3000)
      })
      .returning()
      .execute();
    
    // Second case study (middle)
    const middle = await db.insert(caseStudiesTable)
      .values({
        ...testCaseStudy2,
        slug: 'middle-case-study',
        created_at: new Date(now.getTime() - 2000)
      })
      .returning()
      .execute();
    
    // Third case study (newest)
    const newest = await db.insert(caseStudiesTable)
      .values({
        ...testCaseStudy3,
        created_at: new Date(now.getTime() - 1000)
      })
      .returning()
      .execute();

    const result = await getAllCaseStudies();

    expect(result).toHaveLength(3);
    
    // Verify order (newest first)
    expect(result[0].id).toEqual(newest[0].id);
    expect(result[1].id).toEqual(middle[0].id);
    expect(result[2].id).toEqual(oldest[0].id);
    
    // Verify timestamps are in descending order
    expect(result[0].created_at.getTime()).toBeGreaterThan(result[1].created_at.getTime());
    expect(result[1].created_at.getTime()).toBeGreaterThan(result[2].created_at.getTime());
  });
});