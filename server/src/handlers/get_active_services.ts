import { db } from '../db';
import { servicesTable } from '../db/schema';
import { type Service } from '../schema';
import { eq, asc } from 'drizzle-orm';

export const getActiveServices = async (): Promise<Service[]> => {
  try {
    const result = await db.select()
      .from(servicesTable)
      .where(eq(servicesTable.is_active, true))
      .orderBy(asc(servicesTable.display_order))
      .execute();

    return result;
  } catch (error) {
    console.error('Failed to fetch active services:', error);
    throw error;
  }
};