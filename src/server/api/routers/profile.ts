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

// export const profileRouter = createTRPCRouter({
//     getAll: publicProcedure.query( async ({ ctx, input }) =>{
//       const {userId} = input;
//       const user = await ctx.prisma.user.findUnique({
//         where:{
//           userId: userId
//         }
//       });
//       console.log("USEEER: ", user);
//       return user;
//       if(!user){
//         throw new TRPCError({
//           code:"INTERNAL_SERVER_ERROR", 
//           message:"User not found"
//         });
//       }
//     //   return filterUserForClient(user);
//     }
//     );

//   }),


export const profileRouter = createTRPCRouter({

    getData: publicProcedure.query( async ({ ctx }) =>{
        const user = await ctx.prisma.user.findUnique({
            where:{
                userId: ctx.userId
            }
            });
        return user;
    }),

    getTotalLikes: publicProcedure.query( async ({ ctx }) =>{

        const userposts = await ctx.prisma.post.findMany({
            where:{
                userId: ctx.userId
            }
            });
        
        let total = 0;
        userposts.forEach(element => {
            total += element.likeCount;
        });
        return total;
    }),

    // getData: publicProcedure
    // .create(
    //     z.object({
    //         userid: z.string(),
    //     }),
    // )
    // .query(({ctx}) => {
    //         const name = ctx.input.userid;

    //         console.log(name);
                
    //         return {
    //         greeting: 'Hello',
    //     };
    // })
});
