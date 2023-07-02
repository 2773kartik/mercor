import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { comment } from "postcss";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";


export const profileRouter = createTRPCRouter({

    getData: publicProcedure.query( async ({ ctx }) =>{
        const user = await ctx.prisma.user.findUnique({
            where:{
                userId: ctx?.userId
            }
            });
        return user;
    }),

    getTotalLikes: publicProcedure.query( async ({ ctx }) =>{

        const userposts = await ctx.prisma.post.findMany({
            where:{
                userId: ctx?.userId
            }
            });
        
        let total = 0;
        userposts.forEach(element => {
            total += element.likeCount;
        });
        return total;
    }),

});
