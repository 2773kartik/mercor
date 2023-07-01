import { FormEvent, useState } from "react"
import { api } from "~/utils/api"




export default function CreatePost({clerkUser}){

    const [postTitle, setPostTitle] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')

    const createNewPost = api.posts.create.useMutation();

    function handleCreatePost(e:FormEvent){
        e.preventDefault()
        console.log("Post created")
        // check for empty string from user in title or content
        if(postTitle===null || postTitle==='' || postTitle===undefined){
            console.log("NOO")
            return;
        }
        if(postContent===null || postContent==='' || postContent===undefined){
            console.log("WHATTT")
            return;
        }

        console.log(postContent)
        console.log(postTitle)

        createNewPost.mutate({
            title: postTitle,
            content: postContent,
            userId: clerkUser.user.id,
            skillTag: '',
        })

        


    }

    return (
        <form onSubmit={handleCreatePost}>
            <div className="flex flex-col">
                <input onChange={(e:FormEvent)=>setPostTitle(e.target.value)} type="text" name="postTitle" id="postTitle" placeholder="Title" className="p-2 m-2 border-2 shadow-md rounded outline-none cursor-text"/>
                <textarea onChange={(e:FormEvent)=>setPostContent(e.target.value)} name="postContent" id="postContent" cols={30} rows={10} placeholder="Create a post" className="shadow-md rounded p-2 m-2 resize-none outline-none"></textarea>
                
                <button className="shadow-md bg-orange-400 w-1/2 mx-auto rounded m-2 p-2">Publish</button>

            </div>
        </form>


    )

}