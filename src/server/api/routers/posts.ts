import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";
import { comment } from "postcss";
import { z } from "zod";
import { createTRPCRouter,privateProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user:any) =>{
  return {
    userId: user.id, // id  
    fullName: user?.firstName+' '+user?.lastName, // fullName
    profileImageUrl: user?.profileImageUrl} // profileImageUrl
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query( async ({ ctx }) =>{
    const posts = await ctx.prisma.post.findMany({
      take:100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map( (post) => post.userId),
      limit:100
    })).map(filterUserForClient);

    return posts.map( (post) => {
      const Author =  users.find( (user) => user.userId === post.userId);  // find using the userId from the post and the user list
      if(!Author){
        throw new TRPCError({
          code:"INTERNAL_SERVER_ERROR", 
          message:"Author not found"
        });
      }
      return {
        post, 
        author: Author
      }
    }
    );
  }),

  create: privateProcedure.input(
    z.object({title: z.string(),
      content: z.string(),
      userId: z.string(),
      skillTag: z.string()
      }
    ))
    .mutation( async ({ ctx, input }) =>{
      console.log("HEYYYYYYYYYYYYY")
      const {title, content, userId, skillTag} = input; // fetch data from client
      console.log("context is ",ctx)
      // const User = await ctx.findUserById(userId); // find the user by id
      // console.log("User is ", User)
      return await ctx.prisma.post.create( // save the data in db
        {data:{
          title:title,
          user:{
            // find the user by userId
              connect: {
                userId: userId
              } 
          },
          content:content, 
          id: ctx.userId?.id, // current session id as the user id
          userId: userId,
          skillTag: skillTag,
        }})
    }),
    }

  );
 