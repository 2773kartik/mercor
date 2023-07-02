import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({
    

    getAll: publicProcedure.query( async ({ ctx }) =>{
        try{
            const skills = await ctx.prisma.skill.findMany();
            console.log(skills)
            return skills;
        }catch(err){
            console.log(err);
            return [];
        }
    }),

}
);