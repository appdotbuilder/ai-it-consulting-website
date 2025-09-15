import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput } from '../schema';
import { createBlogPost } from '../handlers/create_blog_post';
import { eq } from 'drizzle-orm';

// Test input for published blog post
const publishedTestInput: CreateBlogPostInput = {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt for the blog post',
  content: 'This is the full content of the test blog post. It contains more detailed information.',
  author: 'Test Author',
  featured_image_url: 'https://example.com/image.jpg',
  is_published: true
};

// Test input for draft blog post
const draftTestInput: CreateBlogPostInput = {
  title: 'Draft Blog Post',
  slug: 'draft-blog-post',
  excerpt: null,
  content: 'This is a draft blog post content.',
  author: 'Draft Author',
  featured_image_url: null,
  is_published: false
};

describe('createBlogPost', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a published blog post', async () => {
    const result = await createBlogPost(publishedTestInput);

    // Basic field validation
    expect(result.title).toEqual('Test Blog Post');
    expect(result.slug).toEqual('test-blog-post');
    expect(result.excerpt).toEqual('This is a test excerpt for the blog post');
    expect(result.content).toEqual('This is the full content of the test blog post. It contains more detailed information.');
    expect(result.author).toEqual('Test Author');
    expect(result.featured_image_url).toEqual('https://example.com/image.jpg');
    expect(result.is_published).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.published_at).toBeInstanceOf(Date);
  });

  it('should create a draft blog post with null published_at', async () => {
    const result = await createBlogPost(draftTestInput);

    // Basic field validation
    expect(result.title).toEqual('Draft Blog Post');
    expect(result.slug).toEqual('draft-blog-post');
    expect(result.excerpt).toEqual(null);
    expect(result.content).toEqual('This is a draft blog post content.');
    expect(result.author).toEqual('Draft Author');
    expect(result.featured_image_url).toEqual(null);
    expect(result.is_published).toEqual(false);
    expect(result.published_at).toEqual(null);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save blog post to database', async () => {
    const result = await createBlogPost(publishedTestInput);

    // Query using proper drizzle syntax
    const blogPosts = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, result.id))
      .execute();

    expect(blogPosts).toHaveLength(1);
    expect(blogPosts[0].title).toEqual('Test Blog Post');
    expect(blogPosts[0].slug).toEqual('test-blog-post');
    expect(blogPosts[0].excerpt).toEqual('This is a test excerpt for the blog post');
    expect(blogPosts[0].content).toEqual('This is the full content of the test blog post. It contains more detailed information.');
    expect(blogPosts[0].author).toEqual('Test Author');
    expect(blogPosts[0].featured_image_url).toEqual('https://example.com/image.jpg');
    expect(blogPosts[0].is_published).toEqual(true);
    expect(blogPosts[0].created_at).toBeInstanceOf(Date);
    expect(blogPosts[0].updated_at).toBeInstanceOf(Date);
    expect(blogPosts[0].published_at).toBeInstanceOf(Date);
  });

  it('should handle slug uniqueness constraint violation', async () => {
    // Create first blog post
    await createBlogPost(publishedTestInput);

    // Try to create another blog post with the same slug
    const duplicateInput: CreateBlogPostInput = {
      ...publishedTestInput,
      title: 'Different Title',
      content: 'Different content'
    };

    await expect(createBlogPost(duplicateInput)).rejects.toThrow(/duplicate key value violates unique constraint/i);
  });

  it('should create blog post with minimal required fields', async () => {
    const minimalInput: CreateBlogPostInput = {
      title: 'Minimal Post',
      slug: 'minimal-post',
      excerpt: null,
      content: 'Minimal content',
      author: 'Minimal Author',
      featured_image_url: null,
      is_published: false // Zod default
    };

    const result = await createBlogPost(minimalInput);

    expect(result.title).toEqual('Minimal Post');
    expect(result.slug).toEqual('minimal-post');
    expect(result.excerpt).toEqual(null);
    expect(result.content).toEqual('Minimal content');
    expect(result.author).toEqual('Minimal Author');
    expect(result.featured_image_url).toEqual(null);
    expect(result.is_published).toEqual(false);
    expect(result.published_at).toEqual(null);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should set published_at when is_published is true', async () => {
    const beforeCreate = new Date();
    const result = await createBlogPost(publishedTestInput);
    const afterCreate = new Date();

    expect(result.published_at).toBeInstanceOf(Date);
    expect(result.published_at!.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(result.published_at!.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });
});