import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactFormsTable } from '../db/schema';
import { type CreateContactFormInput } from '../schema';
import { createContactForm } from '../handlers/create_contact_form';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateContactFormInput = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  company: 'Tech Corp',
  message: 'I would like to inquire about your services.'
};

// Test input without company (nullable field)
const testInputNoCompany: CreateContactFormInput = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  company: null,
  message: 'Please contact me about your consulting services.'
};

describe('createContactForm', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a contact form submission with all fields', async () => {
    const result = await createContactForm(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.email).toEqual('john.doe@example.com');
    expect(result.company).toEqual('Tech Corp');
    expect(result.message).toEqual('I would like to inquire about your services.');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should create a contact form submission without company', async () => {
    const result = await createContactForm(testInputNoCompany);

    // Verify nullable company field
    expect(result.name).toEqual('Jane Smith');
    expect(result.email).toEqual('jane.smith@example.com');
    expect(result.company).toBeNull();
    expect(result.message).toEqual('Please contact me about your consulting services.');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save contact form submission to database', async () => {
    const result = await createContactForm(testInput);

    // Query using proper drizzle syntax
    const submissions = await db.select()
      .from(contactFormsTable)
      .where(eq(contactFormsTable.id, result.id))
      .execute();

    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toEqual('John Doe');
    expect(submissions[0].email).toEqual('john.doe@example.com');
    expect(submissions[0].company).toEqual('Tech Corp');
    expect(submissions[0].message).toEqual('I would like to inquire about your services.');
    expect(submissions[0].created_at).toBeInstanceOf(Date);
  });

  it('should save contact form submission without company to database', async () => {
    const result = await createContactForm(testInputNoCompany);

    // Verify nullable company field is stored correctly
    const submissions = await db.select()
      .from(contactFormsTable)
      .where(eq(contactFormsTable.id, result.id))
      .execute();

    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toEqual('Jane Smith');
    expect(submissions[0].email).toEqual('jane.smith@example.com');
    expect(submissions[0].company).toBeNull();
    expect(submissions[0].message).toEqual('Please contact me about your consulting services.');
    expect(submissions[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle multiple contact form submissions', async () => {
    // Create multiple submissions
    const result1 = await createContactForm(testInput);
    const result2 = await createContactForm(testInputNoCompany);

    // Verify both were created with different IDs
    expect(result1.id).not.toEqual(result2.id);
    expect(result1.name).toEqual('John Doe');
    expect(result2.name).toEqual('Jane Smith');

    // Verify both are stored in database
    const allSubmissions = await db.select()
      .from(contactFormsTable)
      .execute();

    expect(allSubmissions).toHaveLength(2);
    
    const johnSubmission = allSubmissions.find(s => s.name === 'John Doe');
    const janeSubmission = allSubmissions.find(s => s.name === 'Jane Smith');
    
    expect(johnSubmission).toBeDefined();
    expect(janeSubmission).toBeDefined();
    expect(johnSubmission?.company).toEqual('Tech Corp');
    expect(janeSubmission?.company).toBeNull();
  });

  it('should handle long messages correctly', async () => {
    const longMessage = 'This is a very long message that contains multiple sentences. '.repeat(20);
    const longMessageInput: CreateContactFormInput = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Long Message Corp',
      message: longMessage
    };

    const result = await createContactForm(longMessageInput);

    expect(result.message).toEqual(longMessage);
    expect(result.message.length).toBeGreaterThan(500);

    // Verify it's stored correctly in database
    const submissions = await db.select()
      .from(contactFormsTable)
      .where(eq(contactFormsTable.id, result.id))
      .execute();

    expect(submissions[0].message).toEqual(longMessage);
  });
});