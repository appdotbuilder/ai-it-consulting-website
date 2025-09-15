import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactFormsTable } from '../db/schema';
import { type CreateContactFormInput } from '../schema';
import { getContactForms } from '../handlers/get_contact_forms';

describe('getContactForms', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no contact forms exist', async () => {
    const result = await getContactForms();
    
    expect(result).toEqual([]);
  });

  it('should return all contact forms ordered by created_at desc', async () => {
    // Create test contact forms
    const testForm1: CreateContactFormInput = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      message: 'First inquiry'
    };

    const testForm2: CreateContactFormInput = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: null,
      message: 'Second inquiry'
    };

    const testForm3: CreateContactFormInput = {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      company: 'Tech Solutions',
      message: 'Third inquiry'
    };

    // Insert forms with slight delay to ensure different timestamps
    await db.insert(contactFormsTable).values(testForm1).execute();
    await new Promise(resolve => setTimeout(resolve, 10));
    await db.insert(contactFormsTable).values(testForm2).execute();
    await new Promise(resolve => setTimeout(resolve, 10));
    await db.insert(contactFormsTable).values(testForm3).execute();

    const result = await getContactForms();

    expect(result).toHaveLength(3);
    
    // Verify all forms are returned with correct data
    expect(result[0].name).toEqual('Bob Wilson'); // Most recent first
    expect(result[0].email).toEqual('bob@example.com');
    expect(result[0].company).toEqual('Tech Solutions');
    expect(result[0].message).toEqual('Third inquiry');
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);

    expect(result[1].name).toEqual('Jane Smith');
    expect(result[1].email).toEqual('jane@example.com');
    expect(result[1].company).toBeNull();
    expect(result[1].message).toEqual('Second inquiry');

    expect(result[2].name).toEqual('John Doe'); // Oldest last
    expect(result[2].email).toEqual('john@example.com');
    expect(result[2].company).toEqual('Acme Corp');
    expect(result[2].message).toEqual('First inquiry');

    // Verify order by checking timestamps
    expect(result[0].created_at >= result[1].created_at).toBe(true);
    expect(result[1].created_at >= result[2].created_at).toBe(true);
  });

  it('should handle nullable company field correctly', async () => {
    const testFormWithCompany: CreateContactFormInput = {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      company: 'Big Enterprise',
      message: 'Business inquiry'
    };

    const testFormWithoutCompany: CreateContactFormInput = {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      company: null,
      message: 'Personal inquiry'
    };

    await db.insert(contactFormsTable).values(testFormWithCompany).execute();
    await db.insert(contactFormsTable).values(testFormWithoutCompany).execute();

    const result = await getContactForms();

    expect(result).toHaveLength(2);
    
    // Find forms by name to check company field handling
    const aliceForm = result.find(form => form.name === 'Alice Johnson');
    const charlieForm = result.find(form => form.name === 'Charlie Brown');

    expect(aliceForm).toBeDefined();
    expect(aliceForm!.company).toEqual('Big Enterprise');

    expect(charlieForm).toBeDefined();
    expect(charlieForm!.company).toBeNull();
  });

  it('should verify database persistence', async () => {
    const testForm: CreateContactFormInput = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'Test message'
    };

    // Insert directly into database
    await db.insert(contactFormsTable).values(testForm).execute();

    // Fetch using handler
    const result = await getContactForms();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Test User');
    expect(result[0].email).toEqual('test@example.com');
    expect(result[0].company).toEqual('Test Company');
    expect(result[0].message).toEqual('Test message');

    // Verify data is actually in database
    const directQuery = await db.select()
      .from(contactFormsTable)
      .execute();

    expect(directQuery).toHaveLength(1);
    expect(directQuery[0].name).toEqual('Test User');
  });
});