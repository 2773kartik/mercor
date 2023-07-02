import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: privateProcedure.input(
        z.object({
            id: z.string(),
            userId: z.string(),
        })
    )
    .mutation(async ({ctx, input}) => {
        const {id, userId} = input;
        const result = await ctx.prisma.user.create(
            {
                data:{
                    userId:ctx?.userId,
                    skillTag:{},
                }
            }
        );
        return result;
    }),

    getAll: publicProcedure.query( async ({ ctx }) =>{
        const posts = await ctx.prisma.post.findMany({
          take:100,
        });
    return posts;
    }),

    addKarma: privateProcedure.input(
        z.object({
          userId: z.string(),
          karmaToAdd: z.number(),
        })
      ).mutation(async ({ ctx, input }) => {
        const { userId, karmaToAdd } = input;
    
        try {
          // Fetch the user by userId from your data source
          const user = await ctx.prisma.user.findUnique({
            where: {
              userId,
            },
          });
    
          if (!user) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "User not found.",
            });
          }
    
          // Update the user's karma field
          const updatedUser = await ctx.prisma.user.update({
            where: {
              userId,
            },
            data: {
              karma: user.karma + karmaToAdd,
            },
          });
    
          return updatedUser;
        } catch (error) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Error updating user's karma.",
          });
        }
      }),

}
);