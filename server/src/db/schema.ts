import { serial, text, pgTable, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core';

// Contact form submissions table
export const contactFormsTable = pgTable('contact_forms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'), // Nullable by default
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter subscriptions table
export const newsletterSubscriptionsTable = pgTable('newsletter_subscriptions', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Blog posts table
export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'), // Nullable by default
  content: text('content').notNull(),
  author: text('author').notNull(),
  featured_image_url: text('featured_image_url'), // Nullable by default
  is_published: boolean('is_published').default(false).notNull(),
  published_at: timestamp('published_at'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Case studies table
export const caseStudiesTable = pgTable('case_studies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  client_name: text('client_name').notNull(),
  industry: text('industry').notNull(),
  problem_description: text('problem_description').notNull(),
  solution_description: text('solution_description').notNull(),
  results_description: text('results_description').notNull(),
  image_url: text('image_url'), // Nullable by default
  technologies_used: json('technologies_used').$type<string[]>().notNull().default([]),
  is_featured: boolean('is_featured').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Services table
export const servicesTable = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  icon_name: text('icon_name').notNull(),
  features: json('features').$type<string[]>().notNull().default([]),
  is_active: boolean('is_active').default(true).notNull(),
  display_order: integer('display_order').default(0).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Team members table
export const teamMembersTable = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  bio: text('bio').notNull(),
  avatar_url: text('avatar_url'), // Nullable by default
  linkedin_url: text('linkedin_url'), // Nullable by default
  twitter_url: text('twitter_url'), // Nullable by default
  display_order: integer('display_order').default(0).notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type ContactForm = typeof contactFormsTable.$inferSelect;
export type NewContactForm = typeof contactFormsTable.$inferInsert;

export type NewsletterSubscription = typeof newsletterSubscriptionsTable.$inferSelect;
export type NewNewsletterSubscription = typeof newsletterSubscriptionsTable.$inferInsert;

export type BlogPost = typeof blogPostsTable.$inferSelect;
export type NewBlogPost = typeof blogPostsTable.$inferInsert;

export type CaseStudy = typeof caseStudiesTable.$inferSelect;
export type NewCaseStudy = typeof caseStudiesTable.$inferInsert;

export type Service = typeof servicesTable.$inferSelect;
export type NewService = typeof servicesTable.$inferInsert;

export type TeamMember = typeof teamMembersTable.$inferSelect;
export type NewTeamMember = typeof teamMembersTable.$inferInsert;

// Export all tables for relation queries
export const tables = {
  contactForms: contactFormsTable,
  newsletterSubscriptions: newsletterSubscriptionsTable,
  blogPosts: blogPostsTable,
  caseStudies: caseStudiesTable,
  services: servicesTable,
  teamMembers: teamMembersTable,
};