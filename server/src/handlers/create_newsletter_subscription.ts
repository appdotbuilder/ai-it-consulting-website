import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type CreateNewsletterSubscriptionInput, type NewsletterSubscription } from '../schema';
import { eq } from 'drizzle-orm';

export const createNewsletterSubscription = async (input: CreateNewsletterSubscriptionInput): Promise<NewsletterSubscription> => {
  try {
    // Check if email already exists and is active
    const existing = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.email, input.email))
      .limit(1)
      .execute();

    if (existing.length > 0) {
      const existingSubscription = existing[0];
      
      // If subscription exists and is active, return it as-is
      if (existingSubscription.is_active) {
        return existingSubscription;
      }
      
      // If subscription exists but is inactive, reactivate it
      const reactivated = await db.update(newsletterSubscriptionsTable)
        .set({ 
          is_active: true,
          created_at: new Date() // Update timestamp when reactivating
        })
        .where(eq(newsletterSubscriptionsTable.id, existingSubscription.id))
        .returning()
        .execute();
      
      return reactivated[0];
    }

    // Create new subscription if email doesn't exist
    const result = await db.insert(newsletterSubscriptionsTable)
      .values({
        email: input.email,
        is_active: true
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Newsletter subscription creation failed:', error);
    throw error;
  }
};