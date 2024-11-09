//configuring redux store
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer.js'
import messageReducer from './messageReducer'
import userReducer from './userReducer'
import commentReducer from './commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer,
    comment: commentReducer,
  },
})

export default store
