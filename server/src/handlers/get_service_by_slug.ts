import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type Service } from '../schema';
import { eq, and } from 'drizzle-orm';

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  try {
    const result = await db.select()
      .from(servicesTable)
      .where(and(
        eq(servicesTable.slug, slug),
        eq(servicesTable.is_active, true)
      ))
      .limit(1)
      .execute();

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error('Failed to fetch service by slug:', error);
    throw error;
  }
};