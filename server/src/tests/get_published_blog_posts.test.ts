import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput } from '../schema';
import { getPublishedBlogPosts } from '../handlers/get_published_blog_posts';

// Test blog post inputs
const publishedPost1: CreateBlogPostInput = {
  title: 'Published Post 1',
  slug: 'published-post-1',
  excerpt: 'This is a published post',
  content: 'Full content of published post 1',
  author: 'John Doe',
  featured_image_url: 'https://example.com/image1.jpg',
  is_published: true
};

const publishedPost2: CreateBlogPostInput = {
  title: 'Published Post 2', 
  slug: 'published-post-2',
  excerpt: 'Another published post',
  content: 'Full content of published post 2',
  author: 'Jane Smith',
  featured_image_url: null,
  is_published: true
};

const draftPost: CreateBlogPostInput = {
  title: 'Draft Post',
  slug: 'draft-post',
  excerpt: null,
  content: 'This is a draft post',
  author: 'Bob Wilson',
  featured_image_url: null,
  is_published: false
};

describe('getPublishedBlogPosts', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return only published blog posts', async () => {
    // Create both published and draft posts
    await db.insert(blogPostsTable).values([
      {
        ...publishedPost1,
        published_at: new Date('2024-01-15')
      },
      {
        ...publishedPost2,
        published_at: new Date('2024-01-20')
      },
      {
        ...draftPost
      }
    ]).execute();

    const results = await getPublishedBlogPosts();

    // Should only return published posts
    expect(results).toHaveLength(2);
    
    // Verify all returned posts are published
    results.forEach(post => {
      expect(post.is_published).toBe(true);
    });

    // Verify specific posts are included
    const titles = results.map(post => post.title);
    expect(titles).toContain('Published Post 1');
    expect(titles).toContain('Published Post 2');
    expect(titles).not.toContain('Draft Post');
  });

  it('should order posts by published_at descending', async () => {
    // Create posts with different published dates
    await db.insert(blogPostsTable).values([
      {
        ...publishedPost1,
        published_at: new Date('2024-01-10')
      },
      {
        ...publishedPost2, 
        published_at: new Date('2024-01-20')
      }
    ]).execute();

    const results = await getPublishedBlogPosts();

    expect(results).toHaveLength(2);
    
    // Should be ordered by published_at descending (newest first)
    expect(results[0].title).toBe('Published Post 2'); // Published on 2024-01-20
    expect(results[1].title).toBe('Published Post 1'); // Published on 2024-01-10
    
    // Verify dates are in descending order
    expect(results[0].published_at!.getTime()).toBeGreaterThan(results[1].published_at!.getTime());
  });

  it('should handle posts with null published_at by falling back to created_at', async () => {
    const now = new Date();
    const earlier = new Date(now.getTime() - 60000); // 1 minute earlier

    // Create posts - one with published_at, one without
    const insertResult = await db.insert(blogPostsTable).values([
      {
        ...publishedPost1,
        published_at: null,
        created_at: now // More recent created_at
      },
      {
        ...publishedPost2,
        published_at: earlier, // Earlier published_at
        created_at: earlier
      }
    ]).returning().execute();

    const results = await getPublishedBlogPosts();

    expect(results).toHaveLength(2);
    
    // With NULLS LAST: post with published_at comes first, then null published_at ordered by created_at
    expect(results[0].title).toBe('Published Post 2'); // Has published_at (comes before nulls)
    expect(results[1].title).toBe('Published Post 1'); // Null published_at, ordered by created_at
  });

  it('should return empty array when no published posts exist', async () => {
    // Create only draft posts
    await db.insert(blogPostsTable).values([
      {
        ...draftPost
      }
    ]).execute();

    const results = await getPublishedBlogPosts();

    expect(results).toHaveLength(0);
    expect(Array.isArray(results)).toBe(true);
  });

  it('should return all required blog post fields', async () => {
    await db.insert(blogPostsTable).values([
      {
        ...publishedPost1,
        published_at: new Date()
      }
    ]).execute();

    const results = await getPublishedBlogPosts();

    expect(results).toHaveLength(1);
    const post = results[0];

    // Verify all required fields are present
    expect(post.id).toBeDefined();
    expect(post.title).toBe('Published Post 1');
    expect(post.slug).toBe('published-post-1');
    expect(post.excerpt).toBe('This is a published post');
    expect(post.content).toBe('Full content of published post 1');
    expect(post.author).toBe('John Doe');
    expect(post.featured_image_url).toBe('https://example.com/image1.jpg');
    expect(post.is_published).toBe(true);
    expect(post.published_at).toBeInstanceOf(Date);
    expect(post.created_at).toBeInstanceOf(Date);
    expect(post.updated_at).toBeInstanceOf(Date);
  });

  it('should handle posts with null optional fields', async () => {
    await db.insert(blogPostsTable).values([
      {
        title: 'Minimal Post',
        slug: 'minimal-post',
        excerpt: null,
        content: 'Just basic content',
        author: 'Test Author',
        featured_image_url: null,
        is_published: true,
        published_at: null
      }
    ]).execute();

    const results = await getPublishedBlogPosts();

    expect(results).toHaveLength(1);
    const post = results[0];

    expect(post.excerpt).toBeNull();
    expect(post.featured_image_url).toBeNull();
    expect(post.published_at).toBeNull();
    expect(post.is_published).toBe(true);
  });
});