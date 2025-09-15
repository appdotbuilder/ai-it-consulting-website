import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput, type BlogPost } from '../schema';

export const createBlogPost = async (input: CreateBlogPostInput): Promise<BlogPost> => {
  try {
    // Prepare the published_at timestamp if the post is published
    const publishedAt = input.is_published ? new Date() : null;

    // Insert blog post record
    const result = await db.insert(blogPostsTable)
      .values({
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        author: input.author,
        featured_image_url: input.featured_image_url,
        is_published: input.is_published,
        published_at: publishedAt
      })
      .returning()
      .execute();

    // Return the created blog post
    return result[0];
  } catch (error) {
    console.error('Blog post creation failed:', error);
    throw error;
  }
};