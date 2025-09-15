import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable(),
  message: z.string(),
  created_at: z.coerce.date()
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Input schema for creating contact form submissions
export const createContactFormInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().nullable(),
  message: z.string().min(1, "Message is required")
});

export type CreateContactFormInput = z.infer<typeof createContactFormInputSchema>;

// Newsletter subscription schema
export const newsletterSubscriptionSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  is_active: z.boolean(),
  created_at: z.coerce.date()
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;

// Input schema for newsletter subscription
export const createNewsletterSubscriptionInputSchema = z.object({
  email: z.string().email("Valid email is required")
});

export type CreateNewsletterSubscriptionInput = z.infer<typeof createNewsletterSubscriptionInputSchema>;

// Blog post schema
export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  author: z.string(),
  featured_image_url: z.string().nullable(),
  is_published: z.boolean(),
  published_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// Input schema for creating blog posts
export const createBlogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().nullable(),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  featured_image_url: z.string().nullable(),
  is_published: z.boolean().default(false)
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostInputSchema>;

// Update blog post schema
export const updateBlogPostInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  slug: z.string().optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  featured_image_url: z.string().nullable().optional(),
  is_published: z.boolean().optional()
});

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostInputSchema>;

// Case study schema
export const caseStudySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  client_name: z.string(),
  industry: z.string(),
  problem_description: z.string(),
  solution_description: z.string(),
  results_description: z.string(),
  image_url: z.string().nullable(),
  technologies_used: z.array(z.string()),
  is_featured: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

// Input schema for creating case studies
export const createCaseStudyInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  client_name: z.string().min(1, "Client name is required"),
  industry: z.string().min(1, "Industry is required"),
  problem_description: z.string().min(1, "Problem description is required"),
  solution_description: z.string().min(1, "Solution description is required"),
  results_description: z.string().min(1, "Results description is required"),
  image_url: z.string().nullable(),
  technologies_used: z.array(z.string()),
  is_featured: z.boolean().default(false)
});

export type CreateCaseStudyInput = z.infer<typeof createCaseStudyInputSchema>;

// Service schema
export const serviceSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  icon_name: z.string(),
  features: z.array(z.string()),
  is_active: z.boolean(),
  display_order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Service = z.infer<typeof serviceSchema>;

// Input schema for creating services
export const createServiceInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  icon_name: z.string().min(1, "Icon name is required"),
  features: z.array(z.string()),
  is_active: z.boolean().default(true),
  display_order: z.number().int().default(0)
});

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>;

// Team member schema
export const teamMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.string(),
  bio: z.string(),
  avatar_url: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  twitter_url: z.string().nullable(),
  display_order: z.number().int(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type TeamMember = z.infer<typeof teamMemberSchema>;

// Input schema for creating team members
export const createTeamMemberInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  bio: z.string().min(1, "Bio is required"),
  avatar_url: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  twitter_url: z.string().nullable(),
  display_order: z.number().int().default(0),
  is_active: z.boolean().default(true)
});

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberInputSchema>;