import {configureStore} from '@reduxjs/toolkit'
import postsSlice from '../features/postsSlice';
import userSlice from '../features/userSlice';

const Store = configureStore({
  reducer:{
    posts:postsSlice,
    user: userSlice,
  }
})

export default Store;