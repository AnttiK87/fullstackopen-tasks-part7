//reducer for anecdotes

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showMessage } from './messageReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload
      //console.log(deletedBlog)
      return state.filter((blog) => blog.id !== deletedBlog.id)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

// Setting blogs at db to current state with error handling
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      // Käsittele virhe ja näytä käyttäjälle virheilmoitus
      dispatch(
        showMessage(
          {
            text: `Failed to load blogs: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

// Creating new blog and setting it to the state with error handling
export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))

      // Näytä onnistunut viesti
      dispatch(
        showMessage(
          {
            text: `Added a new blog ${content.title} by ${content.author} to the list!`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      // Käsittele virhe ja näytä käyttäjälle virheilmoitus
      dispatch(
        showMessage(
          {
            text: `Failed to create blog: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

//Updating vote count and setting it to the state
export const like = (content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(content)
      dispatch(updateBlog(updatedBlog))

      // Näytä onnistunut viesti
      dispatch(
        showMessage(
          {
            text: `You added a vote for: ${content.title}`,
            type: 'success',
          },
          10
        )
      )
    } catch (error) {
      // Käsittele virhe, esimerkiksi näytä käyttäjälle virheilmoitus
      dispatch(
        showMessage(
          {
            text: `Failed to update the blog: ${error.message}`,
            type: 'error',
          },
          10
        )
      )
    }
  }
}

//Updating vote count and setting it to the state
export const remove = (content) => {
  return async (dispatch) => {
    try {
      await blogService.remove(content)
      dispatch(deleteBlog(content))

      // Onnistunut poistoilmoitus
      dispatch(
        showMessage({ text: `Blog ${content.title} deleted successfully!`, type: 'success' }, 10)
      )
    } catch (error) {
      const errorMessage =
        error.response && error.response.status === 404
          ? `Failed to delete the blog: ${error.message}`
          : `An unexpected error occurred: ${error.message}`

      // Virheilmoituksen näyttäminen
      dispatch(showMessage({ text: errorMessage, type: 'error' }, 10))

      // Varmuuden vuoksi poistetaan blogi frontendistä
      if (error.response && error.response.status === 404) {
        dispatch(deleteBlog(content))
      }
    }
  }
}

export default blogSlice.reducer
