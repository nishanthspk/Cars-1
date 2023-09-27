import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './tokenSlice';

export default configureStore({
  reducer: {
    token: tokenSlice,
  },
})