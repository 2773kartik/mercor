export default function CreatePost(){

    function handleCreatePost(){
        console.log("Post creaetd")
    }

    return (
        <form action="" onSubmit={handleCreatePost}>
            <div className="flex flex-col">
                <input type="text" name="postTitle" id="postTitle" placeholder="Title" className="p-2 m-2 border-2 shadow-md rounded"/>
                <textarea name="postContent" id="postContent" cols={30} rows={10} placeholder="Create a post" className="shadow-md rounded p-2 m-2 resize-none"></textarea>
                
                <button className="shadow-md bg-orange-400 w-1/2 mx-auto rounded m-2 p-2">Publish</button>

            </div>
        </form>


    )

}