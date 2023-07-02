import { RouterOutputs, api } from "~/utils/api";
import { auth, useUser } from "@clerk/nextjs";
import Post from "./Post";
import CreatePost from "./CreatePost";

export default function Landing() {
    const {data, isLoading} = api.posts.getAll.useQuery();
    const user = useUser();
    return (
        <div className="h-full">
          {!user.isSignedIn && <div className="border-b border-slate-400 p-8">Please Sign In to Continue!!</div>}
          <div className="flex flex-col">
              {data?.map(({post, author}) => (
                <Post key={post.id} author={author} post={post}/>
              ))} 
            </div>
            {user && <CreatePost />}
        </div>
    );
}