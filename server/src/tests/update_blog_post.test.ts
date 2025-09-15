import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type UpdateBlogPostInput, type CreateBlogPostInput } from '../schema';
import { updateBlogPost } from '../handlers/update_blog_post';
import { eq } from 'drizzle-orm';

// Helper function to create a test blog post
const createTestBlogPost = async (overrides: Partial<CreateBlogPostInput> = {}) => {
  const testInput: CreateBlogPostInput = {
    title: 'Original Title',
    slug: 'original-slug',
    excerpt: 'Original excerpt',
    content: 'Original content',
    author: 'Original Author',
    featured_image_url: 'https://example.com/original.jpg',
    is_published: false,
    ...overrides
  };

  const result = await db.insert(blogPostsTable)
    .values({
      ...testInput,
      published_at: testInput.is_published ? new Date() : null
    })
    .returning()
    .execute();

  return result[0];
};

describe('updateBlogPost', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should update basic blog post fields', async () => {
    // Create test blog post
    const originalPost = await createTestBlogPost();

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      title: 'Updated Title',
      content: 'Updated content',
      author: 'Updated Author'
    };

    const result = await updateBlogPost(updateInput);

    // Verify updated fields
    expect(result.id).toEqual(originalPost.id);
    expect(result.title).toEqual('Updated Title');
    expect(result.content).toEqual('Updated content');
    expect(result.author).toEqual('Updated Author');
    
    // Verify unchanged fields are preserved
    expect(result.slug).toEqual(originalPost.slug);
    expect(result.excerpt).toEqual(originalPost.excerpt);
    expect(result.featured_image_url).toEqual(originalPost.featured_image_url);
    expect(result.is_published).toEqual(originalPost.is_published);
    expect(result.created_at).toEqual(originalPost.created_at);
    
    // Verify updated_at is changed
    expect(result.updated_at).not.toEqual(originalPost.updated_at);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should update slug and excerpt', async () => {
    const originalPost = await createTestBlogPost();

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      slug: 'new-updated-slug',
      excerpt: 'This is a new excerpt for the updated post'
    };

    const result = await updateBlogPost(updateInput);

    expect(result.slug).toEqual('new-updated-slug');
    expect(result.excerpt).toEqual('This is a new excerpt for the updated post');
    
    // Other fields should remain unchanged
    expect(result.title).toEqual(originalPost.title);
    expect(result.content).toEqual(originalPost.content);
    expect(result.author).toEqual(originalPost.author);
  });

  it('should handle nullable fields correctly', async () => {
    const originalPost = await createTestBlogPost({
      featured_image_url: 'https://example.com/original.jpg'
    });

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      excerpt: null,
      featured_image_url: null
    };

    const result = await updateBlogPost(updateInput);

    expect(result.excerpt).toBeNull();
    expect(result.featured_image_url).toBeNull();
  });

  it('should set published_at when changing from unpublished to published', async () => {
    const originalPost = await createTestBlogPost({ is_published: false });
    expect(originalPost.published_at).toBeNull();

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      is_published: true
    };

    const result = await updateBlogPost(updateInput);

    expect(result.is_published).toBe(true);
    expect(result.published_at).toBeInstanceOf(Date);
    expect(result.published_at).not.toBeNull();
  });

  it('should clear published_at when changing from published to unpublished', async () => {
    const originalPost = await createTestBlogPost({ is_published: true });
    expect(originalPost.published_at).toBeInstanceOf(Date);

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      is_published: false
    };

    const result = await updateBlogPost(updateInput);

    expect(result.is_published).toBe(false);
    expect(result.published_at).toBeNull();
  });

  it('should preserve published_at when keeping published status unchanged', async () => {
    const originalPost = await createTestBlogPost({ is_published: true });
    const originalPublishedAt = originalPost.published_at;

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      title: 'Updated Title',
      // Not changing is_published
    };

    const result = await updateBlogPost(updateInput);

    expect(result.is_published).toBe(true);
    expect(result.published_at).toEqual(originalPublishedAt);
  });

  it('should update data in database', async () => {
    const originalPost = await createTestBlogPost();

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      title: 'Database Updated Title',
      content: 'Database updated content'
    };

    await updateBlogPost(updateInput);

    // Verify data was updated in database
    const posts = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, originalPost.id))
      .execute();

    expect(posts).toHaveLength(1);
    expect(posts[0].title).toEqual('Database Updated Title');
    expect(posts[0].content).toEqual('Database updated content');
    expect(posts[0].updated_at).not.toEqual(originalPost.updated_at);
  });

  it('should throw error when blog post does not exist', async () => {
    const updateInput: UpdateBlogPostInput = {
      id: 99999, // Non-existent ID
      title: 'This should fail'
    };

    await expect(updateBlogPost(updateInput)).rejects.toThrow(/not found/i);
  });

  it('should handle partial updates correctly', async () => {
    const originalPost = await createTestBlogPost({
      title: 'Original Title',
      content: 'Original Content',
      author: 'Original Author',
      is_published: false
    });

    // Update only one field
    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      author: 'New Author Only'
    };

    const result = await updateBlogPost(updateInput);

    // Only author should be changed
    expect(result.author).toEqual('New Author Only');
    expect(result.title).toEqual('Original Title');
    expect(result.content).toEqual('Original Content');
    expect(result.is_published).toBe(false);
  });

  it('should handle updating all fields at once', async () => {
    const originalPost = await createTestBlogPost();

    const updateInput: UpdateBlogPostInput = {
      id: originalPost.id,
      title: 'Completely New Title',
      slug: 'completely-new-slug',
      excerpt: 'Completely new excerpt',
      content: 'Completely new content',
      author: 'Completely New Author',
      featured_image_url: 'https://example.com/new-image.jpg',
      is_published: true
    };

    const result = await updateBlogPost(updateInput);

    expect(result.title).toEqual('Completely New Title');
    expect(result.slug).toEqual('completely-new-slug');
    expect(result.excerpt).toEqual('Completely new excerpt');
    expect(result.content).toEqual('Completely new content');
    expect(result.author).toEqual('Completely New Author');
    expect(result.featured_image_url).toEqual('https://example.com/new-image.jpg');
    expect(result.is_published).toBe(true);
    expect(result.published_at).toBeInstanceOf(Date);
    
    // Should preserve original timestamps appropriately
    expect(result.created_at).toEqual(originalPost.created_at);
    expect(result.updated_at).not.toEqual(originalPost.updated_at);
  });
});