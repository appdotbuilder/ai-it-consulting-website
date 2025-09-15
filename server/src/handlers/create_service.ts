import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type CreateServiceInput, type Service } from '../schema';

export const createService = async (input: CreateServiceInput): Promise<Service> => {
  try {
    // Insert service record
    const result = await db.insert(servicesTable)
      .values({
        title: input.title,
        slug: input.slug,
        description: input.description,
        icon_name: input.icon_name,
        features: input.features, // JSON array - no conversion needed
        is_active: input.is_active, // Boolean column - no conversion needed
        display_order: input.display_order // Integer column - no conversion needed
      })
      .returning()
      .execute();

    // Return the created service
    const service = result[0];
    return service;
  } catch (error) {
    console.error('Service creation failed:', error);
    throw error;
  }
};