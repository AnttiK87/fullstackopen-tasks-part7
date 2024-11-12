//configuring redux store for testing purposes
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer.js'
import messageReducer from '../reducers/messageReducer'
import userReducer from '../reducers/userReducer'
import commentReducer from '../reducers/commentReducer'

export const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      blogs: blogReducer,
      message: messageReducer,
      user: userReducer,
      comment: commentReducer,
    },
    preloadedState,
  })
}
