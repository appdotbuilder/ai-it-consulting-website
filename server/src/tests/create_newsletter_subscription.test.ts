import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type CreateNewsletterSubscriptionInput } from '../schema';
import { createNewsletterSubscription } from '../handlers/create_newsletter_subscription';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateNewsletterSubscriptionInput = {
  email: 'test@example.com'
};

describe('createNewsletterSubscription', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a newsletter subscription', async () => {
    const result = await createNewsletterSubscription(testInput);

    // Basic field validation
    expect(result.email).toEqual('test@example.com');
    expect(result.is_active).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save subscription to database', async () => {
    const result = await createNewsletterSubscription(testInput);

    // Query using proper drizzle syntax
    const subscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.id, result.id))
      .execute();

    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0].email).toEqual('test@example.com');
    expect(subscriptions[0].is_active).toEqual(true);
    expect(subscriptions[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle duplicate email addresses gracefully', async () => {
    // Create first subscription
    const first = await createNewsletterSubscription(testInput);
    expect(first.email).toEqual('test@example.com');
    expect(first.is_active).toEqual(true);

    // Create second subscription with same email
    const second = await createNewsletterSubscription(testInput);
    
    // Should return the existing subscription
    expect(second.id).toEqual(first.id);
    expect(second.email).toEqual('test@example.com');
    expect(second.is_active).toEqual(true);

    // Verify only one record exists in database
    const allSubscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.email, 'test@example.com'))
      .execute();

    expect(allSubscriptions).toHaveLength(1);
  });

  it('should reactivate inactive subscription', async () => {
    // Create initial subscription
    const initial = await createNewsletterSubscription(testInput);
    
    // Manually deactivate the subscription
    await db.update(newsletterSubscriptionsTable)
      .set({ is_active: false })
      .where(eq(newsletterSubscriptionsTable.id, initial.id))
      .execute();

    // Verify it's deactivated
    const deactivated = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.id, initial.id))
      .execute();
    
    expect(deactivated[0].is_active).toEqual(false);

    // Create subscription again with same email
    const reactivated = await createNewsletterSubscription(testInput);

    // Should reactivate the existing subscription
    expect(reactivated.id).toEqual(initial.id);
    expect(reactivated.email).toEqual('test@example.com');
    expect(reactivated.is_active).toEqual(true);
    expect(reactivated.created_at).toBeInstanceOf(Date);

    // Verify only one record exists and it's active
    const finalSubscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.email, 'test@example.com'))
      .execute();

    expect(finalSubscriptions).toHaveLength(1);
    expect(finalSubscriptions[0].is_active).toEqual(true);
  });

  it('should handle different email formats correctly', async () => {
    const emails = [
      'user@domain.com',
      'test.email+tag@example.org',
      'firstname.lastname@company.co.uk'
    ];

    const results = [];
    for (const email of emails) {
      const result = await createNewsletterSubscription({ email });
      results.push(result);
    }

    // All should be created successfully
    expect(results).toHaveLength(3);
    results.forEach((result, index) => {
      expect(result.email).toEqual(emails[index]);
      expect(result.is_active).toEqual(true);
      expect(result.id).toBeDefined();
    });

    // Verify all are saved in database
    const allSubscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .execute();

    expect(allSubscriptions).toHaveLength(3);
    const savedEmails = allSubscriptions.map(sub => sub.email).sort();
    expect(savedEmails).toEqual(emails.sort());
  });

  it('should update timestamp when reactivating subscription', async () => {
    // Create initial subscription
    const initial = await createNewsletterSubscription(testInput);
    const originalTimestamp = initial.created_at;

    // Deactivate it
    await db.update(newsletterSubscriptionsTable)
      .set({ is_active: false })
      .where(eq(newsletterSubscriptionsTable.id, initial.id))
      .execute();

    // Wait a bit to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    // Reactivate by creating subscription again
    const reactivated = await createNewsletterSubscription(testInput);

    // Timestamp should be updated
    expect(reactivated.created_at.getTime()).toBeGreaterThan(originalTimestamp.getTime());
    expect(reactivated.is_active).toEqual(true);
  });
});