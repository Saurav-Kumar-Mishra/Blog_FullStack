import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../utils/BlogAsyncThunkAPI";
import Cookie from "js-cookie";
import { getAllPosts } from "../features/postsSlice";

function BlogContent() {
  const dispatch = useDispatch();
  const token = Cookie.get("token");
  const allPosts = useSelector(getAllPosts);

  useEffect(() => {
    dispatch(fetchAllPosts(token));
  }, [dispatch, token]);

  // pagination logic
  const [index, setIndex] = useState(0);

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleForward = () => {
    if (allPosts.length - 1 > index) {
      setIndex(index + 1);
    }
  };

  if (allPosts.length === 0) {
    return <div>Loading....</div>;
  }

  const currentPost = allPosts[index];

  return (
    <div className="w-screen pt-4 bg-black">
      <div className="flex justify-center">
        {/* For content */}
        <div className="flex flex-col lg:flex-row items-start justify-center w-full text-justify p-2 px-5 gap-1 ">
          <div className="justify-start items-start flex-1 bg-sky-1 h-full lg:border-b-0 border-b-2 lg:border-r-2 w-full bg-slate-100">
            <h1 className=" font-bold text-center  font-mono underline text-3xl decoration-pink-700 underline-offset-8 decoration-4 p-2">
              {currentPost.title}
            </h1>
            <div className="mt-8 mb-4 font-bold p-2">
              <p>Posted on : {new Date(currentPost.createdAt).toLocaleDateString()} </p>
              <p>last updated on : {new Date(currentPost.updatedAt).toLocaleDateString()} </p>
            </div>
            <pre className=" text-justify p-2 text-wrap">
              {currentPost.content}
            </pre>
            <div className="text-center flex justify-center gap-10 mt-4">
              <IoIosArrowBack
                className="text-4xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                onClick={handleBack}
              />

              <IoIosArrowForward
                className="text-4xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  mb-4"
                onClick={handleForward}
              />
            </div>
          </div>
          <div className="flex flex-col items-start  mx-4 p-2 px-6 gap-2 mt-8 lg:mt-0 lg:w-1/4 lg:ml-8 lg:flex-shrink-0 bg-slate-100 lg:h-full">
            <p className="text-center font-bold text-2xl underline decoration-orange-500 underline-offset-4 my-4">
              Author
            </p>
            <img
              className="rounded-xl"
              src={currentPost.user.profilePic ? currentPost.user.profilePic : "user.png"}
              width="40%"
              alt="Author"
            />
            <p className="font-bold">
              Name:{" "}
              <span className=" font-medium text-sm">
                {currentPost.user.name}
              </span>
            </p>
            <p className="font-bold">
              Country:{" "}
              <span className=" font-medium text-sm">
                {currentPost.user.country}
              </span>
            </p>
            <p className="font-bold">
              Rating:{" "}
              <span className=" font-medium text-sm">4.5</span>
            </p>
            <p className="font-bold">
              Email:{" "}
              <a
                href={`mailto:${currentPost.user.email}`}
                className="text-slate-500 font-medium text-sm"
              >
                {currentPost.user.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogContent;
