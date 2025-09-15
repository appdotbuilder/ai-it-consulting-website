import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { type BlogPost } from '../schema';

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const result = await db.select()
      .from(blogPostsTable)
      .where(
        and(
          eq(blogPostsTable.slug, slug),
          eq(blogPostsTable.is_published, true)
        )
      )
      .limit(1)
      .execute();

    if (result.length === 0) {
      return null;
    }

    const blogPost = result[0];
    
    return {
      ...blogPost,
      published_at: blogPost.published_at ? new Date(blogPost.published_at) : null,
      created_at: new Date(blogPost.created_at),
      updated_at: new Date(blogPost.updated_at)
    };
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error);
    throw error;
  }
};