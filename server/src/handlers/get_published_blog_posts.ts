import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type BlogPost } from '../schema';
import { eq, desc, sql } from 'drizzle-orm';

export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Query for published blog posts, ordered by published_at desc nulls last, then created_at desc
    const results = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.is_published, true))
      .orderBy(
        sql`${blogPostsTable.published_at} DESC NULLS LAST`,
        desc(blogPostsTable.created_at)
      )
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch published blog posts:', error);
    throw error;
  }
};