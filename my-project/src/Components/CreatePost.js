import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { createPost, getUser } from "../utils/BlogAsyncThunkAPI";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../features/userSlice";
import { getAllPosts } from "../features/postsSlice";
import Cookie from "js-cookie";

function CreatePost() {
  const [post, setPost] = useState({
    postId: "",
    title: "",
    content: "",
  });

  const token = Cookie.get("token");
  const dispatch = useDispatch();
  const user = useSelector(User);
  const postCreated=useSelector(getAllPosts)
  console.log(postCreated)
  const totalBlogPosted = (user && user.posts.length + 1) || 0;
  useEffect(() => {
    dispatch(getUser(token));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  console.log(post);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ token, data: { ...post, postId: totalBlogPosted } }));
  };

  return (
    <div className="w-screen mb-5">
      <h1 className="text-center text-3xl font-bold font-sans my-2">
        Create a Post Here ....
      </h1>
      <div className="w-full lg:w-[80%] md:w-[90%] bg-slate-300 border-2 relative mx-auto rounded-xl p-4">
        <TiTick
          className="bg-green-500 absolute lg:-left-10 lg:-top-6 md:-left-4 md:-top-8 sm:-left-8 sm:-top-4 text-white rounded-full hidden md:block lg:block"
          size={70}
        />
        <form
          className="flex flex-col w-[80%] mx-auto gap-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="postId" className="text-xl text-red-700 font-bold">
            PostId: *
          </label>
          <input
            type="number"
            disabled
            value={totalBlogPosted}
            id="postId"
            name="postId"
            className="w-full rounded-xl p-2 indent-3 bg-gray-200"
            required
          />
          <label htmlFor="title" className="text-xl text-red-700 font-bold">
            Title: *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of Post"
            className="w-full rounded-xl p-2 indent-3"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="content" className="text-xl text-red-700 font-bold">
            Content: *
          </label>
          <textarea
            rows={10}
            cols={20}
            placeholder="Enter your content here"
            id="content"
            name="content"
            className="w-full rounded-xl p-2 indent-3"
            onChange={handleInputChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full rounded-xl p-2 bg-green-500 font-serif text-white text-xl hover:cursor-pointer hover:bg-green-400"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
