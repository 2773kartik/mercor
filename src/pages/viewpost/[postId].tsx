import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
dayjs.extend(relativeTime);

export default function ViewPost(){

    const router = useRouter();
    const { postId } = router.query;

    // fetch the post and author data from the database using the postId
    const findUser = api.posts.getPostById.useQuery({ postId: postId as string });

    //  get the post and author data from the query
    const post = findUser?.data?.post ? findUser?.data?.post : null;
    const author = findUser?.data?.author ? findUser?.data?.author : null;

    function handleLike(){

    }

    return (
        <div className="flex cursor-pointer bg-white shadow-lg rounded-lg mx-4 md:mx-auto w-full my-2 border-2 border-black max-w-md md:max-w-2xl ">{/*horizantil margin is just for display*/}
            <div className="flex items-start px-4 py-6">
            <Image width="48" height="48" className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={author?.profileImageUrl} alt="avatar" />
            <div className="">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">{author?.fullName} </h2>
                <small className="text-sm text-gray-700"> {dayjs(post?.createdAt).fromNow()}</small>
                </div>
                {/* dangerouslySetInnerHTML parses the HTML in the string we receive from stored post in db */}
                <p dangerouslySetInnerHTML={{ __html: post?.content }} className="mt-3 text-gray-700 text-sm">
                </p>
                <div className="mt-4 flex items-center">
                <div className="flex  text-gray-700 text-sm mr-3">
                    <div onClick={handleLike}>
                        <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <span>{post?.likeCount}</span>
                </div>
                <div className="flex text-gray-700 text-sm mr-8">
                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    {/* <span>{post?.comments}</span> */}
                </div>
                <div className="flex text-gray-700 text-sm mr-4">
                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>share</span>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}