import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CreateCaseStudyInput } from '../schema';
import { createCaseStudy } from '../handlers/create_case_study';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateCaseStudyInput = {
  title: 'Digital Transformation for E-commerce Platform',
  slug: 'digital-transformation-ecommerce',
  client_name: 'TechCorp Solutions',
  industry: 'E-commerce',
  problem_description: 'Legacy system unable to handle growing user base and modern requirements.',
  solution_description: 'Implemented microservices architecture with cloud-native technologies.',
  results_description: 'Achieved 300% performance improvement and 99.9% uptime.',
  image_url: 'https://example.com/case-study-image.jpg',
  technologies_used: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
  is_featured: true
};

// Minimal test input
const minimalInput: CreateCaseStudyInput = {
  title: 'Simple Case Study',
  slug: 'simple-case-study',
  client_name: 'Client Co',
  industry: 'Technology',
  problem_description: 'Basic problem description.',
  solution_description: 'Basic solution description.',
  results_description: 'Basic results description.',
  image_url: null,
  technologies_used: [],
  is_featured: false
};

describe('createCaseStudy', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a case study with all fields', async () => {
    const result = await createCaseStudy(testInput);

    // Validate all returned fields
    expect(result.title).toEqual('Digital Transformation for E-commerce Platform');
    expect(result.slug).toEqual('digital-transformation-ecommerce');
    expect(result.client_name).toEqual('TechCorp Solutions');
    expect(result.industry).toEqual('E-commerce');
    expect(result.problem_description).toEqual(testInput.problem_description);
    expect(result.solution_description).toEqual(testInput.solution_description);
    expect(result.results_description).toEqual(testInput.results_description);
    expect(result.image_url).toEqual('https://example.com/case-study-image.jpg');
    expect(result.technologies_used).toEqual(['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']);
    expect(result.is_featured).toBe(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a case study with minimal fields', async () => {
    const result = await createCaseStudy(minimalInput);

    expect(result.title).toEqual('Simple Case Study');
    expect(result.slug).toEqual('simple-case-study');
    expect(result.client_name).toEqual('Client Co');
    expect(result.industry).toEqual('Technology');
    expect(result.image_url).toBeNull();
    expect(result.technologies_used).toEqual([]);
    expect(result.is_featured).toBe(false);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save case study to database', async () => {
    const result = await createCaseStudy(testInput);

    // Verify record exists in database
    const caseStudies = await db.select()
      .from(caseStudiesTable)
      .where(eq(caseStudiesTable.id, result.id))
      .execute();

    expect(caseStudies).toHaveLength(1);
    const saved = caseStudies[0];
    
    expect(saved.title).toEqual('Digital Transformation for E-commerce Platform');
    expect(saved.slug).toEqual('digital-transformation-ecommerce');
    expect(saved.client_name).toEqual('TechCorp Solutions');
    expect(saved.industry).toEqual('E-commerce');
    expect(saved.image_url).toEqual('https://example.com/case-study-image.jpg');
    expect(saved.technologies_used).toEqual(['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']);
    expect(saved.is_featured).toBe(true);
    expect(saved.created_at).toBeInstanceOf(Date);
    expect(saved.updated_at).toBeInstanceOf(Date);
  });

  it('should handle empty technologies array correctly', async () => {
    const inputWithEmptyTech: CreateCaseStudyInput = {
      ...testInput,
      technologies_used: []
    };

    const result = await createCaseStudy(inputWithEmptyTech);

    expect(result.technologies_used).toEqual([]);

    // Verify in database
    const saved = await db.select()
      .from(caseStudiesTable)
      .where(eq(caseStudiesTable.id, result.id))
      .execute();

    expect(saved[0].technologies_used).toEqual([]);
  });

  it('should reject duplicate slugs', async () => {
    // Create first case study
    await createCaseStudy(testInput);

    // Try to create another with same slug
    const duplicateInput: CreateCaseStudyInput = {
      ...testInput,
      title: 'Different Title',
      client_name: 'Different Client'
    };

    // Should throw error due to unique constraint on slug
    expect(createCaseStudy(duplicateInput)).rejects.toThrow(/unique/i);
  });

  it('should handle large technologies array', async () => {
    const largeInput: CreateCaseStudyInput = {
      ...testInput,
      technologies_used: [
        'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Fastify',
        'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP',
        'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions',
        'TypeScript', 'JavaScript', 'Python', 'Go'
      ]
    };

    const result = await createCaseStudy(largeInput);

    expect(result.technologies_used).toHaveLength(20);
    expect(result.technologies_used).toContain('React');
    expect(result.technologies_used).toContain('Go');
  });

  it('should set timestamps correctly', async () => {
    const beforeCreate = new Date();
    const result = await createCaseStudy(testInput);
    const afterCreate = new Date();

    expect(result.created_at.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(result.created_at.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    expect(result.updated_at.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(result.updated_at.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });
});