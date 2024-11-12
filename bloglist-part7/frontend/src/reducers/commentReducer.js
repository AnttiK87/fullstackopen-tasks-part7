//reducer for comments of the blogs
//depebdencies
import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { showMessage } from './messageReducer'

//create slice
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comment: '',
    comments: [],
  },
  reducers: {
    setComment(state, action) {
      state.comment = action.payload
    },
    setComments(state, action) {
      state.comments = action.payload
    },
    appendComment(state, action) {
      state.comments.push(action.payload)
    },
  },
})

export const { setComment, setComments, appendComment } = commentSlice.actions

// Setting comments at db to current state with error handling
export const initializeComments = () => {
  return async (dispatch) => {
    try {
      const comments = await commentService.getAll()
      dispatch(setComments(comments))
    } catch (error) {
      // handle possible error and show error message
      dispatch(
        showMessage(
          {
            text: `Failed to load comments: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

// Creating new comment and setting it to the state with error handling
export const createComment = (content) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.create(content)
      dispatch(appendComment(newComment))

      // show message comment added
      dispatch(
        showMessage(
          {
            text: `Added a new comment "${content.comment}"`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      // handle error and show error message
      dispatch(
        showMessage(
          {
            text: `Failed to add comment: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

//export
export default commentSlice.reducer
