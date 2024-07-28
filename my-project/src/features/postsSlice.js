import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost, deletePost, fetchAllPosts } from "../utils/BlogAsyncThunkAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  totalPost:0
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // getTotalPost:(state)=>{state.totalPost=a}
  },
  extraReducers(builder) {
    // Handling getPosts async actions
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.Posts)
        state.posts = action.payload.Posts; 
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  
      });
      
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.Posts)
        state.posts = action.payload.Posts; 
        state.error = null;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  
      });

    // Handling createPost async actions
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts=(action.payload); // Assuming payload structure has 'post' object
        state.error = null;
        toast.success(`🦄 ${action.payload.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Access error message if available
      });
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.posts.push(action.payload); // Assuming payload structure has 'post' object
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Access error message if available
      })
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.success(`🦄 ${action.payload.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        state.posts=state.posts.filter((post)=>post.postId!==action.payload.postId)
        state.error = null;
      })  
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Access error message if available
      })
  },
});

// Selectors
export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.loading;
export const getPostsErrors = (state) => state.posts.error;
export const getTotalPostLength =(state)=> state.posts.posts.length;

export default postSlice.reducer;
