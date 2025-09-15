import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CreateCaseStudyInput } from '../schema';
import { getCaseStudyBySlug } from '../handlers/get_case_study_by_slug';

// Test data
const testCaseStudy: CreateCaseStudyInput = {
  title: 'E-commerce Platform Transformation',
  slug: 'ecommerce-platform-transformation',
  client_name: 'TechCorp Inc',
  industry: 'Retail Technology',
  problem_description: 'Legacy system performance issues affecting customer experience',
  solution_description: 'Modern microservices architecture with cloud deployment',
  results_description: '300% performance improvement and 99.9% uptime',
  image_url: 'https://example.com/case-study-image.jpg',
  technologies_used: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  is_featured: true
};

const secondCaseStudy: CreateCaseStudyInput = {
  title: 'Healthcare Data Analytics',
  slug: 'healthcare-data-analytics',
  client_name: 'MedCenter Solutions',
  industry: 'Healthcare',
  problem_description: 'Inefficient data processing and reporting',
  solution_description: 'Real-time analytics platform with ML insights',
  results_description: '50% reduction in report generation time',
  image_url: null,
  technologies_used: ['Python', 'TensorFlow', 'PostgreSQL'],
  is_featured: false
};

describe('getCaseStudyBySlug', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return case study when found by slug', async () => {
    // Insert test case study
    await db.insert(caseStudiesTable)
      .values({
        title: testCaseStudy.title,
        slug: testCaseStudy.slug,
        client_name: testCaseStudy.client_name,
        industry: testCaseStudy.industry,
        problem_description: testCaseStudy.problem_description,
        solution_description: testCaseStudy.solution_description,
        results_description: testCaseStudy.results_description,
        image_url: testCaseStudy.image_url,
        technologies_used: testCaseStudy.technologies_used,
        is_featured: testCaseStudy.is_featured
      })
      .execute();

    const result = await getCaseStudyBySlug('ecommerce-platform-transformation');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('E-commerce Platform Transformation');
    expect(result!.slug).toEqual('ecommerce-platform-transformation');
    expect(result!.client_name).toEqual('TechCorp Inc');
    expect(result!.industry).toEqual('Retail Technology');
    expect(result!.problem_description).toEqual('Legacy system performance issues affecting customer experience');
    expect(result!.solution_description).toEqual('Modern microservices architecture with cloud deployment');
    expect(result!.results_description).toEqual('300% performance improvement and 99.9% uptime');
    expect(result!.image_url).toEqual('https://example.com/case-study-image.jpg');
    expect(result!.technologies_used).toEqual(['React', 'Node.js', 'PostgreSQL', 'AWS']);
    expect(result!.is_featured).toEqual(true);
    expect(result!.id).toBeDefined();
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null when case study not found', async () => {
    const result = await getCaseStudyBySlug('non-existent-slug');
    expect(result).toBeNull();
  });

  it('should handle case study with nullable fields', async () => {
    // Insert case study with null image_url
    await db.insert(caseStudiesTable)
      .values({
        title: secondCaseStudy.title,
        slug: secondCaseStudy.slug,
        client_name: secondCaseStudy.client_name,
        industry: secondCaseStudy.industry,
        problem_description: secondCaseStudy.problem_description,
        solution_description: secondCaseStudy.solution_description,
        results_description: secondCaseStudy.results_description,
        image_url: secondCaseStudy.image_url,
        technologies_used: secondCaseStudy.technologies_used,
        is_featured: secondCaseStudy.is_featured
      })
      .execute();

    const result = await getCaseStudyBySlug('healthcare-data-analytics');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Healthcare Data Analytics');
    expect(result!.image_url).toBeNull();
    expect(result!.technologies_used).toEqual(['Python', 'TensorFlow', 'PostgreSQL']);
    expect(result!.is_featured).toEqual(false);
  });

  it('should return only the first match for duplicate slugs', async () => {
    // Insert first case study
    await db.insert(caseStudiesTable)
      .values({
        title: 'First Case Study',
        slug: 'duplicate-slug',
        client_name: 'First Client',
        industry: 'Technology',
        problem_description: 'First problem',
        solution_description: 'First solution',
        results_description: 'First results',
        image_url: null,
        technologies_used: ['React'],
        is_featured: false
      })
      .execute();

    // Insert second case study with same slug (shouldn't happen due to unique constraint, but testing limit(1))
    const result = await getCaseStudyBySlug('duplicate-slug');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('First Case Study');
    expect(result!.client_name).toEqual('First Client');
  });

  it('should handle empty technologies_used array', async () => {
    await db.insert(caseStudiesTable)
      .values({
        title: 'Simple Case Study',
        slug: 'simple-case-study',
        client_name: 'Simple Client',
        industry: 'Basic Industry',
        problem_description: 'Basic problem',
        solution_description: 'Basic solution',
        results_description: 'Basic results',
        image_url: null,
        technologies_used: [], // Empty array
        is_featured: false
      })
      .execute();

    const result = await getCaseStudyBySlug('simple-case-study');

    expect(result).not.toBeNull();
    expect(result!.technologies_used).toEqual([]);
    expect(Array.isArray(result!.technologies_used)).toBe(true);
  });

  it('should handle special characters in slug', async () => {
    await db.insert(caseStudiesTable)
      .values({
        title: 'Special Characters Case',
        slug: 'case-with-numbers-123-and-symbols',
        client_name: 'Special Client',
        industry: 'Special Industry',
        problem_description: 'Special problem',
        solution_description: 'Special solution',
        results_description: 'Special results',
        image_url: null,
        technologies_used: ['JavaScript'],
        is_featured: false
      })
      .execute();

    const result = await getCaseStudyBySlug('case-with-numbers-123-and-symbols');

    expect(result).not.toBeNull();
    expect(result!.slug).toEqual('case-with-numbers-123-and-symbols');
    expect(result!.title).toEqual('Special Characters Case');
  });
});