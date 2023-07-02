import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/router";
import Select from "react-select";
import OptionTypeBase from 'react-select'
import { toast } from "react-toastify";

export default function CreatePost(){
    const router = useRouter();
    const clerkUser = useUser();
    const [postTitle, setPostTitle] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')

    const [selectedOption, setSelectedOption] = useState<string>('');

    function handleSkillChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.target.value);
        
    }
    console.log(selectedOption);
    // API to create a new post
    const createNewPost = api.posts.create.useMutation();
    // Fetching all the skills from the database
    const { data } = api.skill.getApprovedSkills.useQuery();

    // function to handle the creation of a new post
    async function handleCreatePost(e:FormEvent){ 
        e.preventDefault()
        // check for empty string from user in title or content
        if(postTitle===null || postTitle==='' || postTitle===undefined){
            toast.warning("Give a title first!");
            return;
        }
        if(selectedOption==='' || selectedOption===null || selectedOption===undefined) {
            toast.warning("Select a tag please!");
            return;
        }
        if(postContent===null || postContent==='' || postContent===undefined){
          toast.warning("Can't post empty body!");
          return;
        }
        
        if (!clerkUser.user?.id) {
          console.log("User is not defined");
          return;
        }

        createNewPost.mutate({
            title: postTitle,
            content: postContent,
            userId: clerkUser.user.id,
            skillTag: selectedOption,
        })

        setPostContent('');
        setPostTitle('');   
        
        // Go back to home page
        router.push('/');
        return;

    }

    return (

        <form onSubmit={handleCreatePost}>
            <div className="w-4/5 mx-auto  flex flex-col">
                <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setPostTitle(e.target.value)} type="text" name="postTitle" value={postTitle} id="postTitle" placeholder="Title" className="p-2 text-black my-2 border-2 shadow-md outline-none cursor-text"/>
                <RichTextEditor onChange={(content:string)=>setPostContent(content)} />
                
                <select
                    className="p-2 m-2 text-black border-2 shadow-md rounded outline-none cursor-pointer"
                    value={selectedOption}
                    onChange={handleSkillChange}
                    >
                    {data?.map((skill: { id: string; name: string, approved: boolean }) => (
                        <option key={skill.id} value={skill.id}>
                        {skill.name}
                        </option>
                    ))}
                </select>
                <button className="shadow-md bg-orange-400 w-1/2 mx-auto rounded m-2 p-2">Publish</button>

            </div>
        </form>


    )

}
