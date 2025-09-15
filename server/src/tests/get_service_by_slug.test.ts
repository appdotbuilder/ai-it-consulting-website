import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type CreateServiceInput } from '../schema';
import { getServiceBySlug } from '../handlers/get_service_by_slug';

// Test service data
const testService: CreateServiceInput = {
  title: 'Web Development',
  slug: 'web-development',
  description: 'Full-stack web development services',
  icon_name: 'code',
  features: ['React', 'Node.js', 'Database Design'],
  is_active: true,
  display_order: 1
};

const inactiveService: CreateServiceInput = {
  title: 'Inactive Service',
  slug: 'inactive-service',
  description: 'This service is not active',
  icon_name: 'disabled',
  features: ['Feature 1', 'Feature 2'],
  is_active: false,
  display_order: 2
};

describe('getServiceBySlug', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return service by slug when active', async () => {
    // Create test service
    const insertResult = await db.insert(servicesTable)
      .values(testService)
      .returning()
      .execute();

    const createdService = insertResult[0];

    // Test the handler
    const result = await getServiceBySlug('web-development');

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdService.id);
    expect(result!.title).toEqual('Web Development');
    expect(result!.slug).toEqual('web-development');
    expect(result!.description).toEqual('Full-stack web development services');
    expect(result!.icon_name).toEqual('code');
    expect(result!.features).toEqual(['React', 'Node.js', 'Database Design']);
    expect(result!.is_active).toEqual(true);
    expect(result!.display_order).toEqual(1);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null for non-existent slug', async () => {
    const result = await getServiceBySlug('non-existent-service');
    expect(result).toBeNull();
  });

  it('should return null for inactive service', async () => {
    // Create inactive service
    await db.insert(servicesTable)
      .values(inactiveService)
      .returning()
      .execute();

    // Test the handler
    const result = await getServiceBySlug('inactive-service');
    expect(result).toBeNull();
  });

  it('should handle empty slug gracefully', async () => {
    const result = await getServiceBySlug('');
    expect(result).toBeNull();
  });

  it('should return correct service when multiple services exist', async () => {
    // Create multiple services
    await db.insert(servicesTable)
      .values([testService, inactiveService])
      .execute();

    // Test fetching the active one
    const result = await getServiceBySlug('web-development');

    expect(result).not.toBeNull();
    expect(result!.slug).toEqual('web-development');
    expect(result!.is_active).toEqual(true);
  });

  it('should handle slug case sensitivity correctly', async () => {
    // Create test service
    await db.insert(servicesTable)
      .values(testService)
      .execute();

    // Test with different case - should return null as slugs are case-sensitive
    const result = await getServiceBySlug('WEB-DEVELOPMENT');
    expect(result).toBeNull();
  });
});