import { createSlice } from "@reduxjs/toolkit";
import { getUser, login } from "../utils/BlogAsyncThunkAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {                          // use logout api from BlogAsyncThunkAPI
      state.data = null;
      state.isLoggedIn = false;
      console.log("logout reducer")
    },
  },
  extraReducers(builder) {
    // Handling getPosts async actions
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming payload structure has 'post' object
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Access error message if available
      });
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.success)
        state.isLoggedIn = action.payload.success;
        document.cookie = `BlogTankRole=${action.payload.role}`;
        document.cookie = `token=${action.payload.token}`;
        toast.success(`🦄 ${action.payload.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
     
      });
  },
});
// Selectors
export const User = (state) => state.user.user;
export const getUserStatus = (state) => state.user.loading;
export const getUserErrors = (state) => state.user.error;

export const {logout} = userSlice.actions;

export default userSlice.reducer;
