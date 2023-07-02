import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({
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
        try{
            const skills = await ctx.prisma.post.findMany();
            return skills;
        }catch(err){
            console.log(err);
            return [];
        }
    }),

}
);