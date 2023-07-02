import { RouterOutputs, api } from "~/utils/api";
import { auth, useUser } from "@clerk/nextjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "./Post";
import Link from "next/link";
import CreatePost from "./CreatePost";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { set } from "zod";
import { InfinitePostsScroll } from "./InfinitePostsScroll";

export default function Landing() {
    const user = useUser();
    
    const {data, isLoading, isError, hasNextPage, fetchNextPage} = api.posts.getAll.useInfiniteQuery({},
        {
          getNextPageParam: (lastPage) => { lastPage.nextCursor }
        }
    );
        console.log(typeof data?.pages)


    return (

        <div className="h-full w-9/12">
          {user ? 
            (
              <div className="flex my-2 rounded-sm bg-white justify-around items-center">
                <Link href={'/profile'}>
                  <Image src={user.user?.profileImageUrl as string} alt="SkillShow Logo" width={50} height={50} className="rounded-full m-2"/>
                </Link>
                <Link href={'/createpost'} className="w-full p-2">
                  <input type="text" name="postTitle" id="postTitle" placeholder="Create a post" className="p-2 text-black border-2 shadow-md rounded-sm m-2 w-full border-black mx-auto outline-none cursor-text"/>
                </Link>
              </div>
            )
          :
          null
          }

          {!user.isSignedIn && <div className="border-b border-slate-400 p-8">Please Sign In to Continue!!</div>}
          <InfinitePostsScroll data={data} isError={isError} isLoading={isLoading} hasMore={hasNextPage} fetchNewPosts = {fetchNextPage} />
        </div>
    );
}