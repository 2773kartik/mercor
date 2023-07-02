import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { useUser } from "@clerk/nextjs"
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A dummy Text that will go here' }],
    },
  ];
  

export default function CreatePost(){
    const [editor] = useState(() => withReact(createEditor()))
    const clerkUser = useUser();
    const [postTitle, setPostTitle] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')

    const createNewPost = api.posts.create.useMutation();

    async function handleCreatePost(e:FormEvent){
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
       
        if (!clerkUser.user?.id) {
            console.log("User is not defined");
            return;
          }

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
                <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setPostTitle(e.target.value)} type="text" name="postTitle" id="postTitle" placeholder="Title" className="p-2 text-black m-2 border-2 shadow-md rounded outline-none cursor-text"/>
                <textarea onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setPostContent(e.target.value)} name="postContent" id="postContent" cols={30} rows={10} placeholder="Create a post" className="shadow-md text-black rounded p-2 m-2 resize-none outline-none"></textarea>
                <Slate editor={editor} initialValue={initialValue}>
                    <Editable />
                </Slate>
                <button className="shadow-md bg-orange-400 w-1/2 mx-auto rounded m-2 p-2">Publish</button>

            </div>
        </form>


    )

}