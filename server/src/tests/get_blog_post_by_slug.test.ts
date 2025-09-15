import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput } from '../schema';
import { getBlogPostBySlug } from '../handlers/get_blog_post_by_slug';
import { eq } from 'drizzle-orm';

// Test blog post inputs
const publishedBlogPost: CreateBlogPostInput = {
  title: 'Published Blog Post',
  slug: 'published-blog-post',
  excerpt: 'This is a published blog post excerpt',
  content: 'This is the full content of a published blog post.',
  author: 'John Doe',
  featured_image_url: 'https://example.com/image.jpg',
  is_published: true
};

const unpublishedBlogPost: CreateBlogPostInput = {
  title: 'Draft Blog Post',
  slug: 'draft-blog-post',
  excerpt: 'This is a draft blog post excerpt',
  content: 'This is the full content of a draft blog post.',
  author: 'Jane Smith',
  featured_image_url: null,
  is_published: false
};

describe('getBlogPostBySlug', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return published blog post by slug', async () => {
    // Create a published blog post
    await db.insert(blogPostsTable)
      .values({
        ...publishedBlogPost,
        published_at: new Date()
      })
      .execute();

    const result = await getBlogPostBySlug('published-blog-post');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Published Blog Post');
    expect(result!.slug).toEqual('published-blog-post');
    expect(result!.excerpt).toEqual('This is a published blog post excerpt');
    expect(result!.content).toEqual('This is the full content of a published blog post.');
    expect(result!.author).toEqual('John Doe');
    expect(result!.featured_image_url).toEqual('https://example.com/image.jpg');
    expect(result!.is_published).toBe(true);
    expect(result!.id).toBeDefined();
    expect(result!.published_at).toBeInstanceOf(Date);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null for unpublished blog post', async () => {
    // Create an unpublished blog post
    await db.insert(blogPostsTable)
      .values(unpublishedBlogPost)
      .execute();

    const result = await getBlogPostBySlug('draft-blog-post');

    expect(result).toBeNull();
  });

  it('should return null for non-existent slug', async () => {
    // Create a published blog post
    await db.insert(blogPostsTable)
      .values({
        ...publishedBlogPost,
        published_at: new Date()
      })
      .execute();

    const result = await getBlogPostBySlug('non-existent-slug');

    expect(result).toBeNull();
  });

  it('should handle blog posts with null fields correctly', async () => {
    // Create a published blog post with nullable fields set to null
    const minimalBlogPost = {
      title: 'Minimal Blog Post',
      slug: 'minimal-blog-post',
      excerpt: null,
      content: 'Just the content, nothing else.',
      author: 'Minimal Author',
      featured_image_url: null,
      is_published: true,
      published_at: null
    };

    await db.insert(blogPostsTable)
      .values(minimalBlogPost)
      .execute();

    const result = await getBlogPostBySlug('minimal-blog-post');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Minimal Blog Post');
    expect(result!.excerpt).toBeNull();
    expect(result!.featured_image_url).toBeNull();
    expect(result!.published_at).toBeNull();
    expect(result!.is_published).toBe(true);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should verify blog post is saved in database correctly', async () => {
    // Create a published blog post
    await db.insert(blogPostsTable)
      .values({
        ...publishedBlogPost,
        published_at: new Date()
      })
      .execute();

    // Verify it exists in database
    const dbResults = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, 'published-blog-post'))
      .execute();

    expect(dbResults).toHaveLength(1);
    expect(dbResults[0].title).toEqual('Published Blog Post');
    expect(dbResults[0].is_published).toBe(true);

    // Now fetch via handler
    const result = await getBlogPostBySlug('published-blog-post');
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(dbResults[0].id);
  });

  it('should only return published posts when multiple posts with different publish status exist', async () => {
    // Create both published and unpublished posts
    await db.insert(blogPostsTable)
      .values([
        {
          ...publishedBlogPost,
          published_at: new Date()
        },
        unpublishedBlogPost
      ])
      .execute();

    // Should find the published post
    const publishedResult = await getBlogPostBySlug('published-blog-post');
    expect(publishedResult).not.toBeNull();
    expect(publishedResult!.is_published).toBe(true);

    // Should not find the unpublished post
    const unpublishedResult = await getBlogPostBySlug('draft-blog-post');
    expect(unpublishedResult).toBeNull();
  });
});