import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CreateCaseStudyInput } from '../schema';
import { getFeaturedCaseStudies } from '../handlers/get_featured_case_studies';

// Test data for featured case study
const featuredCaseStudyInput: CreateCaseStudyInput = {
  title: 'Featured Case Study',
  slug: 'featured-case-study',
  client_name: 'Acme Corp',
  industry: 'Technology',
  problem_description: 'Company needed better user engagement',
  solution_description: 'We implemented a modern web application',
  results_description: 'User engagement increased by 300%',
  image_url: 'https://example.com/featured-image.jpg',
  technologies_used: ['React', 'Node.js', 'PostgreSQL'],
  is_featured: true
};

// Test data for non-featured case study
const regularCaseStudyInput: CreateCaseStudyInput = {
  title: 'Regular Case Study',
  slug: 'regular-case-study',
  client_name: 'Beta Inc',
  industry: 'Finance',
  problem_description: 'Legacy system needed modernization',
  solution_description: 'Built new microservices architecture',
  results_description: 'Performance improved by 50%',
  image_url: null,
  technologies_used: ['Python', 'Docker', 'MongoDB'],
  is_featured: false
};

describe('getFeaturedCaseStudies', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no featured case studies exist', async () => {
    const result = await getFeaturedCaseStudies();
    expect(result).toEqual([]);
  });

  it('should return only featured case studies', async () => {
    // Create both featured and non-featured case studies
    await db.insert(caseStudiesTable)
      .values([
        {
          ...featuredCaseStudyInput,
          technologies_used: featuredCaseStudyInput.technologies_used,
        },
        {
          ...regularCaseStudyInput,
          technologies_used: regularCaseStudyInput.technologies_used,
        }
      ])
      .execute();

    const result = await getFeaturedCaseStudies();

    expect(result).toHaveLength(1);
    expect(result[0].title).toEqual('Featured Case Study');
    expect(result[0].is_featured).toBe(true);
    expect(result[0].client_name).toEqual('Acme Corp');
    expect(result[0].industry).toEqual('Technology');
    expect(result[0].technologies_used).toEqual(['React', 'Node.js', 'PostgreSQL']);
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
    expect(result[0].updated_at).toBeInstanceOf(Date);
  });

  it('should return multiple featured case studies ordered by created_at desc', async () => {
    const olderFeaturedInput: CreateCaseStudyInput = {
      title: 'Older Featured Case Study',
      slug: 'older-featured-case-study',
      client_name: 'Old Corp',
      industry: 'Manufacturing',
      problem_description: 'Outdated processes needed automation',
      solution_description: 'Implemented IoT sensors and analytics',
      results_description: 'Efficiency improved by 40%',
      image_url: null,
      technologies_used: ['Java', 'Spring Boot', 'MySQL'],
      is_featured: true
    };

    // Insert older case study first
    await db.insert(caseStudiesTable)
      .values({
        ...olderFeaturedInput,
        technologies_used: olderFeaturedInput.technologies_used,
      })
      .execute();

    // Wait a moment to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    // Insert newer case study
    await db.insert(caseStudiesTable)
      .values({
        ...featuredCaseStudyInput,
        technologies_used: featuredCaseStudyInput.technologies_used,
      })
      .execute();

    const result = await getFeaturedCaseStudies();

    expect(result).toHaveLength(2);
    // Should be ordered by created_at desc (newest first)
    expect(result[0].title).toEqual('Featured Case Study');
    expect(result[1].title).toEqual('Older Featured Case Study');
    expect(result[0].created_at.getTime()).toBeGreaterThan(result[1].created_at.getTime());
  });

  it('should exclude non-featured case studies completely', async () => {
    // Create only non-featured case studies
    await db.insert(caseStudiesTable)
      .values([
        {
          ...regularCaseStudyInput,
          technologies_used: regularCaseStudyInput.technologies_used,
        },
        {
          ...regularCaseStudyInput,
          title: 'Another Regular Case Study',
          slug: 'another-regular-case-study',
          client_name: 'Gamma LLC',
          technologies_used: ['Vue.js', 'Express'],
        }
      ])
      .execute();

    const result = await getFeaturedCaseStudies();
    expect(result).toHaveLength(0);
  });

  it('should return all fields for featured case studies', async () => {
    await db.insert(caseStudiesTable)
      .values({
        ...featuredCaseStudyInput,
        technologies_used: featuredCaseStudyInput.technologies_used,
      })
      .execute();

    const result = await getFeaturedCaseStudies();
    const caseStudy = result[0];

    // Verify all fields are present and have correct types
    expect(typeof caseStudy.id).toBe('number');
    expect(typeof caseStudy.title).toBe('string');
    expect(typeof caseStudy.slug).toBe('string');
    expect(typeof caseStudy.client_name).toBe('string');
    expect(typeof caseStudy.industry).toBe('string');
    expect(typeof caseStudy.problem_description).toBe('string');
    expect(typeof caseStudy.solution_description).toBe('string');
    expect(typeof caseStudy.results_description).toBe('string');
    expect(typeof caseStudy.image_url).toBe('string');
    expect(Array.isArray(caseStudy.technologies_used)).toBe(true);
    expect(typeof caseStudy.is_featured).toBe('boolean');
    expect(caseStudy.created_at).toBeInstanceOf(Date);
    expect(caseStudy.updated_at).toBeInstanceOf(Date);
  });
});