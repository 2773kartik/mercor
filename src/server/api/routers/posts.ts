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
  getAll: publicProcedure.input(z.object({
    limit: z.number().optional(),
    cursor: z.object( {
      id:z.string(), 
      createdAt:z.date().optional(),
    }).optional(),
    // pageNumber: z.number(),
    // postsPerPage: z.number(),
  }))
  .query( async ({ ctx, input }) =>{
    const {limit=50, cursor} = input; // fetch data from client

    const posts = await ctx.prisma.post.findMany({
      take: limit+1, 
      cursor: cursor ? {createdAt_id: cursor} : undefined,
      orderBy: [{createdAt:'desc'}, {id:'desc'}],
      select:{
        id:true,
        content:true,
        title:true,
        createdAt:true,
        likeCount:true,
        userId:true,
        skillTag:true,
      }
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map( (post) => post.userId),
      limit:limit
    })).map(filterUserForClient);

    const newPosts = posts.map( (post) => {
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

    let nextCursor:typeof cursor | undefined;
    if(newPosts.length > limit){
      const lastPost = newPosts.pop();
      if(lastPost != null){
        nextCursor = {
          id: lastPost?.post.id,
          createdAt: lastPost?.post.createdAt
        }
      }
    }

    const postsToSend = [...newPosts];
    return {postsToSend, nextCursor};


  }),

  create: privateProcedure.input(
    z.object({title: z.string(),
      content: z.string(),
      userId: z.string(),
      skillTag: z.string()
      }
    ))
    .mutation( async ({ ctx, input }) =>{
      const {title, content, userId, skillTag} = input; // fetch data from client
      const result = await ctx.prisma.post.create( // save the data in db
        {data:{
          title:title,
          user:{
            // find the user by userId
              connect: {
                userId: userId
              } 
          },
          content:content, 
          skillTag: {
            connect: {
              id:skillTag
            }
          },
        }});
        
        return result;
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
        return data;
      }catch(err){
        console.log(err);
        return {};
      }
    }),


    }

  );
 