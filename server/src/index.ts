import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createContactFormInputSchema,
  createNewsletterSubscriptionInputSchema,
  createBlogPostInputSchema,
  updateBlogPostInputSchema,
  createCaseStudyInputSchema,
  createServiceInputSchema,
  createTeamMemberInputSchema
} from './schema';

// Import handlers
import { createContactForm } from './handlers/create_contact_form';
import { getContactForms } from './handlers/get_contact_forms';
import { createNewsletterSubscription } from './handlers/create_newsletter_subscription';
import { getPublishedBlogPosts } from './handlers/get_published_blog_posts';
import { getBlogPostBySlug } from './handlers/get_blog_post_by_slug';
import { createBlogPost } from './handlers/create_blog_post';
import { updateBlogPost } from './handlers/update_blog_post';
import { getFeaturedCaseStudies } from './handlers/get_featured_case_studies';
import { getAllCaseStudies } from './handlers/get_all_case_studies';
import { getCaseStudyBySlug } from './handlers/get_case_study_by_slug';
import { createCaseStudy } from './handlers/create_case_study';
import { getActiveServices } from './handlers/get_active_services';
import { getServiceBySlug } from './handlers/get_service_by_slug';
import { createService } from './handlers/create_service';
import { getActiveTeamMembers } from './handlers/get_active_team_members';
import { createTeamMember } from './handlers/create_team_member';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Contact form routes
  createContactForm: publicProcedure
    .input(createContactFormInputSchema)
    .mutation(({ input }) => createContactForm(input)),
  
  getContactForms: publicProcedure
    .query(() => getContactForms()),

  // Newsletter subscription routes
  createNewsletterSubscription: publicProcedure
    .input(createNewsletterSubscriptionInputSchema)
    .mutation(({ input }) => createNewsletterSubscription(input)),

  // Blog post routes
  getPublishedBlogPosts: publicProcedure
    .query(() => getPublishedBlogPosts()),

  getBlogPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getBlogPostBySlug(input.slug)),

  createBlogPost: publicProcedure
    .input(createBlogPostInputSchema)
    .mutation(({ input }) => createBlogPost(input)),

  updateBlogPost: publicProcedure
    .input(updateBlogPostInputSchema)
    .mutation(({ input }) => updateBlogPost(input)),

  // Case study routes
  getFeaturedCaseStudies: publicProcedure
    .query(() => getFeaturedCaseStudies()),

  getAllCaseStudies: publicProcedure
    .query(() => getAllCaseStudies()),

  getCaseStudyBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getCaseStudyBySlug(input.slug)),

  createCaseStudy: publicProcedure
    .input(createCaseStudyInputSchema)
    .mutation(({ input }) => createCaseStudy(input)),

  // Service routes
  getActiveServices: publicProcedure
    .query(() => getActiveServices()),

  getServiceBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getServiceBySlug(input.slug)),

  createService: publicProcedure
    .input(createServiceInputSchema)
    .mutation(({ input }) => createService(input)),

  // Team member routes
  getActiveTeamMembers: publicProcedure
    .query(() => getActiveTeamMembers()),

  createTeamMember: publicProcedure
    .input(createTeamMemberInputSchema)
    .mutation(({ input }) => createTeamMember(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();