import { RouterOutputs, api } from "~/utils/api";
import { auth, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

const CreatePost = () => {
  const {user} = useUser();
  if(!user) return null;

  return <div className="flex gap-3 w-full">
    <Image src = {user.profileImageUrl} alt={`@${auth.name}_profilePic`} width={56} height={56} className="h-14 w-14 rounded-full"/>
    <input placeholder="Time to Shine!!" className="bg-transparent grow outline-none"/>
  </div>
}

type PostUse  = RouterOutputs["posts"]["getAll"][number];
const PostSee = (props: PostUse) => {
  const {post, author} = props;
  return (
    <div key={post.id} className="border-b border-slate-400 p-4 gap-3 flex">
      <Image src={author.profilePic} alt="MyProfilePic" width={56} height={56} className="h-14 w-14 rounded-full"/>
      <div className="flex flex-col">
        <div className="flex text-slate-300">
          <span>{`@${author.name} `}</span>
          <span className="font-thin">{` - ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
}

export default function Landing() {
    const {data} = api.posts.getAll.useQuery();
    const user = useUser();
    return (
        <div className="h-full">
          {!user.isSignedIn && <div className="border-b border-slate-400 p-8">Please Sign In to Continue!!</div>}
          {data?.map((full) => (
            <PostSee {...full} key={full.post.id}/>
          ))} 
          {user.isSignedIn && <CreatePost/>}
        </div>
    );
}