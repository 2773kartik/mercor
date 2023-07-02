import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { userRouter } from "./routers/user";
import { profileRouter } from "./routers/profile"
import { skillRouter } from "./routers/skill";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  users: userRouter,
  profile: profileRouter,
  skills: skillRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
