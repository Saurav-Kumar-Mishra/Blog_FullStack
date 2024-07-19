import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "../utils/timeAgo";
import {
  getAllPosts,
  getPostsStatus,
  getPostsErrors,
} from "../features/postsSlice";
import {getPosts} from "../utils/BlogAsyncThunkAPI";
import Cookie from "js-cookie";
import { IoIosAddCircleOutline } from "react-icons/io";

function AllPosts() {
  let allPosts = useSelector(getAllPosts);
  if(allPosts){
    console.log(allPosts.flat())
    console.log(allPosts.flat().length)
    allPosts=allPosts.flat()
  }
  const postStatus = useSelector(getPostsStatus);
  const postErrors = useSelector(getPostsErrors);
  const dispatch = useDispatch();
  const token = Cookie.get("token");

  useEffect(() => {
    if (token) {
      dispatch(getPosts(token));
      
    }
  }, [dispatch, token]);

  function handleDelete(postId)
  {
    
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="poppins-extrabold  text-4xl text-center">
        See All Your Posts here .......
      </h1>
      {postStatus ? (
        <div className="font-bold text-xl grid place-content-center min-h-screen">
          Loading.....
        </div>
      ) : postErrors ? (
        <div className="font-bold text-xl grid place-content-center min-h-screen">
          Error: {postErrors}
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 p-2">
            {allPosts &&
              allPosts.map((post) => (
                <div
                  className="p-4 bg-white rounded-lg shadow-md relative flex flex-col gap-8"
                  key={post.postId}
                >
                  <p className="absolute top-2 left-2 bg-yellow-300 p-1 px-2 rounded">
                    {post.postId}
                  </p>
                  <h1 className="text-center text-xl font-bold font-serif underline decoration-yellow-300 underline-offset-4 decoration-4">
                    {post.title}
                  </h1>
                  <p className="poppins-light text-justify">
                    {post.content.length > 300
                      ? post.content.slice(0, 300)
                      : post.content}
                  </p>
                  <div className="pl-2 mt-4">
                    <p className="font-bold">
                      Posted: <TimeAgo timestamp={post.createdAt} />
                    </p>
                    <p className="font-bold">
                      Last Updated: <TimeAgo timestamp={post.updatedAt} />
                    </p>
                  </div>
                  <button onClick={()=>handleDelete(post.postId)} className="bg-red-600 text-white p-2 hover:bg-red-500">delete post</button>
                </div>
              ))}
            {/* //  card to add posts */}
            <div className="flex flex-col items-center justify-center bg-cyan-100  shadow-md rounded-lg">
              <IoIosAddCircleOutline
                size={50}
                className="hover:animate-ping hover:cursor-pointer "
              />
              <p className="text-xl font-bold">Add Post</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
