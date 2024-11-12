//reducer for blogs
//depedencies
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { showMessage } from './messageReducer'

//create slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    name: '',
    password: '',
    user: null,
    users: [],
    selectedUser: [],
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.username = ''
      state.password = ''
      state.user = null
    },
    setUsers(state, action) {
      state.users = action.payload
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload
    },
    appendUser(state, action) {
      state.users.push(action.payload)
    },
  },
})

//exports
export const {
  setUsername,
  setPassword,
  setUser,
  clearUser,
  setUsers,
  setSelectedUser,
  appendUser,
} = userSlice.actions

// Setting users at db to current state with error handling
export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      //console.log(users)
      dispatch(setUsers(users))
    } catch (error) {
      // handle possible error and show error message
      dispatch(
        showMessage(
          {
            text: `Failed to load users: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

//get user by id
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await userService.getUserById(id)
      //console.log(users)
      dispatch(setSelectedUser(user))
    } catch (error) {
      // handle possible error and show error message
      dispatch(
        showMessage(
          {
            text: `Failed to load user: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

// Creating new user and setting it to the state with error handling
export const createUser = (content) => {
  return async (dispatch) => {
    try {
      const newUser = await userService.create(content)
      dispatch(appendUser(newUser))

      dispatch(
        showMessage(
          {
            text: `Added a new User ${content.name}!`,
            type: 'success',
          },
          5
        )
      )
      return true // return true for navigating after registration of user
    } catch (error) {
      // TODO: add better error handing for validation errors
      dispatch(
        showMessage(
          {
            text: `Failed to add user: ${error.message}`,
            type: 'error',
          },
          5
        )
      )
      return false // return false if adding user was not completed succesfully
    }
  }
}

//export
export default userSlice.reducer
