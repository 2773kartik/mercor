import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import type { User } from "@clerk/nextjs/api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fileURLToPath } from "url";
import { use } from "react";
import { TRPCError } from "@trpc/server";

const filterUser = (user: User) => {
  return {id: user.id, name:user.username, profilePic:user.profileImageUrl}
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    })
    ).map(filterUser);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if(!author) 
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message:"Author for post not found",
        });
      return {
      post,
      author,
   }})
  }),
});
