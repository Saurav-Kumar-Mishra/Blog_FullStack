import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost } from "../utils/BlogAsyncThunkAPI";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Handling getPosts async actions
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.posts = action.payload.Posts; 
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
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
        state.posts.push(action.payload); // Assuming payload structure has 'post' object
        state.error = null;
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
  },
});

// Selectors
export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.loading;
export const getPostsErrors = (state) => state.posts.error;

export default postSlice.reducer;
