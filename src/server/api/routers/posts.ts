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

    getLikes: privateProcedure.input(
      z.object({
        postId: z.string(),
        }
      ))
      .mutation( async ({ ctx, input }) =>{
        const {postId} = input; 
        try{
          // Increment the like count of the post in database
          const post = await ctx.prisma.post.update({
            where:{
              id: postId
            },
            data:{
              likeCount:{
                increment:1
              }
            }
          });
        }catch(err){
          console.log(err);
          return {};
        }
      }),

    getComments: privateProcedure.input(
      z.object({
        postId: z.string(),
      })
    )
    .query( async ({ ctx, input }) =>{
      const {postId} = input; // fetch data from client
      try{
        // Fetch comments from database
        const comments = await ctx.prisma.comment.findMany({
          where:{
            postId: postId
          },
          select:{
            id:true,
            body:true,
            userId:true,
            createdAt:true,
          }
        });
        // get user details of the comment
        const users = (await clerkClient.users.getUserList({
          userId: comments.map( (comment) => comment.userId),
          limit:100
        })).map(filterUserForClient);

        // return all the comments with user details
        return comments.map( (comment) => {
          const Author =  users.find( (user) => user.userId === comment.userId);  // find using the userId from the post and the user list
          if(!Author){
            throw new TRPCError({
              code:"INTERNAL_SERVER_ERROR", 
              message:"Author not found"
            });
          }
          return {
            comment: comment.body,
            author: Author.fullName,
            profileImageUrl: Author.profileImageUrl,
            createdAt: comment.createdAt,
          }
        }
        );


        
          
      }catch(err){
        console.log(err);
        return {};
      }
    }),

    //fetch comments where postId = postId
    

    // const users = (await clerkClient.users.getUserList({
    //   userId: comments.map( (post) => post.userId),
    //   limit:100
    // })).map(filterUserForClient);

    // return comments.map( (post) => {
    //   const Author =  users.find( (user) => user.userId === post.userId);  // find using the userId from the post and the user list
    //   if(!Author){
    //     throw new TRPCError({
    //       code:"INTERNAL_SERVER_ERROR", 
    //       message:"Author not found"
    //     });
    //   }
    //   return {
    //     post, 
    //     author: Author
    //   }
    // }
    // );

    }

  );
 