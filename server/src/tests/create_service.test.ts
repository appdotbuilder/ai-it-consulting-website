import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type CreateServiceInput } from '../schema';
import { createService } from '../handlers/create_service';
import { eq } from 'drizzle-orm';

// Complete test input with all fields
const testInput: CreateServiceInput = {
  title: 'Web Development',
  slug: 'web-development',
  description: 'Full-stack web development services using modern technologies',
  icon_name: 'code',
  features: ['React', 'TypeScript', 'Node.js', 'Database Design'],
  is_active: true,
  display_order: 1
};

describe('createService', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a service with all fields', async () => {
    const result = await createService(testInput);

    // Basic field validation
    expect(result.title).toEqual('Web Development');
    expect(result.slug).toEqual('web-development');
    expect(result.description).toEqual(testInput.description);
    expect(result.icon_name).toEqual('code');
    expect(result.features).toEqual(['React', 'TypeScript', 'Node.js', 'Database Design']);
    expect(result.is_active).toEqual(true);
    expect(result.display_order).toEqual(1);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save service to database correctly', async () => {
    const result = await createService(testInput);

    // Query using proper drizzle syntax
    const services = await db.select()
      .from(servicesTable)
      .where(eq(servicesTable.id, result.id))
      .execute();

    expect(services).toHaveLength(1);
    const service = services[0];
    expect(service.title).toEqual('Web Development');
    expect(service.slug).toEqual('web-development');
    expect(service.description).toEqual(testInput.description);
    expect(service.icon_name).toEqual('code');
    expect(service.features).toEqual(['React', 'TypeScript', 'Node.js', 'Database Design']);
    expect(service.is_active).toEqual(true);
    expect(service.display_order).toEqual(1);
    expect(service.created_at).toBeInstanceOf(Date);
    expect(service.updated_at).toBeInstanceOf(Date);
  });

  it('should handle empty features array', async () => {
    const inputWithEmptyFeatures: CreateServiceInput = {
      ...testInput,
      features: []
    };

    const result = await createService(inputWithEmptyFeatures);

    expect(result.features).toEqual([]);
    expect(result.features).toHaveLength(0);
  });

  it('should handle default values from Zod schema', async () => {
    // Test with minimal input (Zod defaults should be applied)
    const minimalInput: CreateServiceInput = {
      title: 'Minimal Service',
      slug: 'minimal-service',
      description: 'A minimal service for testing',
      icon_name: 'star',
      features: ['Feature 1'],
      is_active: true, // Default value from Zod
      display_order: 0 // Default value from Zod
    };

    const result = await createService(minimalInput);

    expect(result.title).toEqual('Minimal Service');
    expect(result.is_active).toEqual(true); // Default value
    expect(result.display_order).toEqual(0); // Default value
  });

  it('should handle inactive service creation', async () => {
    const inactiveServiceInput: CreateServiceInput = {
      ...testInput,
      title: 'Inactive Service',
      slug: 'inactive-service',
      is_active: false
    };

    const result = await createService(inactiveServiceInput);

    expect(result.is_active).toEqual(false);
    expect(result.title).toEqual('Inactive Service');
  });

  it('should handle different display orders', async () => {
    const highOrderInput: CreateServiceInput = {
      ...testInput,
      title: 'High Priority Service',
      slug: 'high-priority',
      display_order: 100
    };

    const result = await createService(highOrderInput);

    expect(result.display_order).toEqual(100);
    expect(result.title).toEqual('High Priority Service');
  });

  it('should reject duplicate slug', async () => {
    // Create first service
    await createService(testInput);

    // Attempt to create another service with the same slug
    const duplicateSlugInput: CreateServiceInput = {
      ...testInput,
      title: 'Different Title',
      slug: 'web-development' // Same slug as first service
    };

    // Should throw error due to unique constraint violation
    expect(createService(duplicateSlugInput)).rejects.toThrow(/duplicate key value violates unique constraint|UNIQUE constraint failed/i);
  });

  it('should handle complex features array', async () => {
    const complexFeaturesInput: CreateServiceInput = {
      ...testInput,
      title: 'Full-Stack Service',
      slug: 'full-stack',
      features: [
        'Frontend Development',
        'Backend Development',
        'Database Design',
        'API Development',
        'DevOps Setup',
        'Testing & QA',
        'Performance Optimization'
      ]
    };

    const result = await createService(complexFeaturesInput);

    expect(result.features).toHaveLength(7);
    expect(result.features).toContain('Frontend Development');
    expect(result.features).toContain('Performance Optimization');
  });
});