import Post from "./Post"
import InfiniteScroll from "react-infinite-scroll-component"
// type Post = { 

type InfiniteScrollProps = {
    data: any;
    isLoading: boolean;
    hasMore: boolean;
    isError: boolean;
    fetchNewPosts: () => Promise<unknown>;
}

export function InfinitePostsScroll({data, isLoading, hasMore, isError, fetchNewPosts}: InfiniteScrollProps) {
    const posts = data?.pages[0]?.postsToSend.map(({post,author})=>{
        return {
            post: post,
            author: author
        }
    })

    if(isLoading) {
        return (<div className="text-bold text-3xl text-center text-black my-auto"> Loading... </div>)
    }
    if(isError) {
        return (<div className="text-bold text-3xl text-center text-black my-auto"> Something Went Wrong </div>)
    }

    if(posts==null || posts.length == 0) {
        return (<div className="text-bold text-3xl text-center text-black my-auto"> No Posts Yet </div>)
    }

    return (
        <InfiniteScroll 
        hasMore={hasMore}
        dataLength={posts?.length}  
        loader={<h4>Loading...</h4>}
        next={fetchNewPosts}
        >
            {posts?.map(({post, author}) => (
                <Post key={post.id} author={author} post={post}/>
            ))} 
        </InfiniteScroll>

    )


}