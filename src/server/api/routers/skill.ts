import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { comment } from "postcss";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({

    getApprovedSkills: publicProcedure.query( async ({ctx}) => {
        try{
            const skillList = await ctx.prisma.skill.findMany({
                where: {
                    approved: true,
                }
            });
        return skillList;
        }
        catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Error getting Skill",
              });
        }
    }),

    create: privateProcedure.input(
        z.object({
            name: z.string(),
        })
    )
    .mutation(async ({ctx, input}) => {
        const {name} = input;
        const result = await ctx.prisma.skill.create(
            {
                data:{
                    name:name,
                    approved:false,
                }
            }
        );
        return result;
    }),
})