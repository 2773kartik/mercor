import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { comment } from "postcss";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";


export const profileRouter = createTRPCRouter({

    getData: publicProcedure.query( async ({ ctx }) =>{
        try {const user = await ctx.prisma.user.findUnique({
            where:{
                userId: ctx?.userId ? ctx?.userId : undefined
            }
            });
        return user;}
        catch (error) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Error getting data",
            });
          }
    }),

    getTotalLikes: publicProcedure.query( async ({ ctx }) =>{

        const userposts = await ctx.prisma.post.findMany({
            where:{
                userId: ctx?.userId ? ctx?.userId : undefined
            }
            });
        
        let total = 0;
        userposts.forEach(element => {
            total += element.likeCount;
        });
        return total;
    }),

});
