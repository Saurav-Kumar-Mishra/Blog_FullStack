import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getUser = createAsyncThunk(
  "getUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3009/api/v1/getuser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (error) {
      console.log("asyncThinkApiError", error);
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "Login",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.post(
        "http://localhost:3009/api/v1/login",
        data
      );
      console.log('success',response.data.success)
      if (!response.data.success) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return rejectWithValue(response.data.message);
      }
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "Logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3009/api/v1/logout",
        data
      );
      if (!response.data.success) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);





// Blog CRUD Operations API


export const getPosts = createAsyncThunk(
  "getPosts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3009/api/v1/getAllPosts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("asyncThinkApiError", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "fetchAllPosts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3009/api/v1/fetchallposts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("asyncThinkApiError", error);
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "user/createPost",
  async ({ token, data }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
        "http://localhost:3009/api/v1/createPost",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "user/updatePost",
  async (token, updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3009/api/v1/updatePost",
        JSON.stringify(updatedData),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


export const uploadProfilePic =  createAsyncThunk (
  'user/uploadProfilePic',
  async ({token,formData}, {rejectWithValue} ) => {
    console.log(formData)
    try {
      const response  =  await axios.post("http://localhost:3009/api/v1/imgFileUpload",
        formData,
        {
          headers : {
            Authorization: "Bearer " + token,
          },
        }
      );
      if(!response.data.success)
        {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return rejectWithValue(response.data.message);
        }
        return response.data;

    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
)

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async ({token, postId}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "http://localhost:3009/api/v1/deletePost",
        
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { postId }
        },
      );
      if(!response.data.success)
      {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
