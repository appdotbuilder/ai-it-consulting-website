import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type CreateServiceInput } from '../schema';
import { getActiveServices } from '../handlers/get_active_services';

// Test service data
const createTestService = (overrides: Partial<CreateServiceInput> = {}): CreateServiceInput => ({
  title: 'Test Service',
  slug: 'test-service',
  description: 'A service for testing',
  icon_name: 'test-icon',
  features: ['Feature 1', 'Feature 2'],
  is_active: true,
  display_order: 0,
  ...overrides
});

describe('getActiveServices', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no services exist', async () => {
    const result = await getActiveServices();
    expect(result).toEqual([]);
  });

  it('should return only active services', async () => {
    // Create active service
    const activeService = createTestService({ 
      title: 'Active Service',
      slug: 'active-service',
      is_active: true 
    });
    await db.insert(servicesTable).values(activeService);

    // Create inactive service
    const inactiveService = createTestService({ 
      title: 'Inactive Service',
      slug: 'inactive-service',
      is_active: false 
    });
    await db.insert(servicesTable).values(inactiveService);

    const result = await getActiveServices();

    expect(result).toHaveLength(1);
    expect(result[0].title).toEqual('Active Service');
    expect(result[0].is_active).toBe(true);
  });

  it('should order services by display_order ascending', async () => {
    // Create services with different display orders
    const service1 = createTestService({ 
      title: 'Third Service',
      slug: 'third-service',
      display_order: 2
    });
    const service2 = createTestService({ 
      title: 'First Service',
      slug: 'first-service',
      display_order: 0
    });
    const service3 = createTestService({ 
      title: 'Second Service',
      slug: 'second-service',
      display_order: 1
    });

    await db.insert(servicesTable).values([service1, service2, service3]);

    const result = await getActiveServices();

    expect(result).toHaveLength(3);
    expect(result[0].title).toEqual('First Service');
    expect(result[0].display_order).toBe(0);
    expect(result[1].title).toEqual('Second Service');
    expect(result[1].display_order).toBe(1);
    expect(result[2].title).toEqual('Third Service');
    expect(result[2].display_order).toBe(2);
  });

  it('should return all service fields correctly', async () => {
    const serviceInput = createTestService({
      title: 'Complete Service',
      slug: 'complete-service',
      description: 'A complete service with all fields',
      icon_name: 'complete-icon',
      features: ['Feature A', 'Feature B', 'Feature C'],
      is_active: true,
      display_order: 5
    });

    await db.insert(servicesTable).values(serviceInput);

    const result = await getActiveServices();

    expect(result).toHaveLength(1);
    const service = result[0];
    
    expect(service.id).toBeDefined();
    expect(service.title).toEqual('Complete Service');
    expect(service.slug).toEqual('complete-service');
    expect(service.description).toEqual('A complete service with all fields');
    expect(service.icon_name).toEqual('complete-icon');
    expect(service.features).toEqual(['Feature A', 'Feature B', 'Feature C']);
    expect(service.is_active).toBe(true);
    expect(service.display_order).toBe(5);
    expect(service.created_at).toBeInstanceOf(Date);
    expect(service.updated_at).toBeInstanceOf(Date);
  });

  it('should handle multiple active services with mixed display orders', async () => {
    const services = [
      createTestService({ 
        title: 'Service C',
        slug: 'service-c',
        display_order: 10,
        is_active: true
      }),
      createTestService({ 
        title: 'Service A',
        slug: 'service-a',
        display_order: 1,
        is_active: true
      }),
      createTestService({ 
        title: 'Inactive Service',
        slug: 'inactive-service',
        display_order: 0,
        is_active: false
      }),
      createTestService({ 
        title: 'Service B',
        slug: 'service-b',
        display_order: 5,
        is_active: true
      })
    ];

    await db.insert(servicesTable).values(services);

    const result = await getActiveServices();

    expect(result).toHaveLength(3);
    expect(result.map(s => s.title)).toEqual([
      'Service A',
      'Service B', 
      'Service C'
    ]);
    expect(result.map(s => s.display_order)).toEqual([1, 5, 10]);
    result.forEach(service => {
      expect(service.is_active).toBe(true);
    });
  });
});