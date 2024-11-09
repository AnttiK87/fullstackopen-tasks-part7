import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { showMessage } from './messageReducer'

const commentSlice = createSlice({
  name: 'comment', // Voit halutessasi vaihtaa tämänkin, mutta se ei ole virheellistä
  initialState: {
    comment: '', // Yksittäinen kommentti, jota voidaan muokata
    comments: [], // Lista kaikista kommenteista
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

export const initializeComments = () => {
  return async (dispatch) => {
    try {
      const comments = await commentService.getAll() // Oletettavasti tämä metodi hakee kaikki kommentit
      dispatch(setComments(comments))
    } catch (error) {
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

export const createComment = (content) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.create(content) // Oletettavasti tämä metodi luo uuden kommentin
      dispatch(appendComment(newComment))

      // Näytä onnistunut viesti
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

export default commentSlice.reducer // Exportaa kommenttien reducer
