import { RouterOutputs, api } from "~/utils/api";
import { auth, useUser } from "@clerk/nextjs";
import Post from "./Post";
import Link from "next/link";
import CreatePost from "./CreatePost";

export default function Landing() {
    const {data, isLoading} = api.posts.getAll.useQuery();
    const user = useUser();

    return (

        <div className="h-12">
          {user ? 
            (
              <div className="flex justify-center items-center">
                <Link href={'/createpost'}>
                  <input type="text" name="postTitle" id="postTitle" placeholder="Create a post" className="p-2 text-black border-2 shadow-md rounded-sm m-2 w-full border-black mx-auto outline-none cursor-text"/>
                </Link>
              </div>
            )
          :
          null
          }

          {!user.isSignedIn && <div className="border-b border-slate-400 p-8">Please Sign In to Continue!!</div>}
          <div className="flex flex-col h-screen overflow-y-scroll">
              {data?.map(({post, author}) => (
                <Post key={post.id} author={author} post={post}/>
              ))} 
            </div>
        </div>
    );
}