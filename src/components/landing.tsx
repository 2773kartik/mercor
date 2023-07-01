import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

export default function Landing() {
    const {data} = api.posts.getAll.useQuery();
    const user = useUser();
    return (
        <div className="h-full">
          {!user.isSignedIn && <div className="border-b border-slate-400 p-8">Please Sign In to Continue!!</div>}
          {data?.map((post) => (
            <div key={post.id} className="border-b border-slate-400 p-8">{post.content}</div>
          ))} 
        </div>
    );
}