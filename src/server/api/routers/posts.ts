import { clerkClient } from "@clerk/nextjs";
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
      skillTag: z.string()
      }
    ))
    .mutation( async ({ ctx, input }) =>{
      const {title, content, skillTag} = input; // fetch data from client
      
      try{

        // Find the skill by name, name is unique for every skill
        const skill = await ctx.prisma.skill.findUnique({
          where: {
            name: skillTag,
          },
        });

        if (!skill) { // if skill not found throw error
          throw new Error(`Skill with name '${skillTag}' not found.`);
        }

        // save the data in db
        const result = await ctx.prisma.post.create( // save the data in db
        {data:{
          title:title,
          user:{
            // find the user by userId, connecting this post to it's user
            connect: {
              userId: ctx?.userId
            } 
          },
          content:content, 
          skillTag: { // connect the skill to the post
            connect: {
              id: skill.id
            }
          },
        }});
        
        return result;
      }catch(err){ // case of error return empty array
        console.log(err);
        return [];
      }
    }),

    getPostById: privateProcedure.input(
      z.object({
        postId: z.string(),
      })
    )
    .query( async ({ ctx, input }) =>{
      const {postId} = input; // fetch data from client
      try{
        const post = await ctx.prisma.post.findUnique({
          where:{
            id: postId
          },
          select:{
            title:true,
            content:true,
            userId:true,
            skillTag:true,
            createdAt:true,
            likeCount:true,
          }
        });
        if(!post){
          throw new Error(`Post with id '${postId}' not found.`);
        }
        const Author = await clerkClient.users.getUser(post.userId);
        const data = {
          post,
          author: filterUserForClient(Author)
        };
        console.log("DAATAA IS ", data);
        return data;
      }catch(err){
        console.log(err);
        return {};
      }
    }),


    }

  );
 