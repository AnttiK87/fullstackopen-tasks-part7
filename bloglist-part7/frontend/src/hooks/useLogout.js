import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer.js'
import { showMessage } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

// Function for handling user logging out
const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Clear local storage
      window.localStorage.clear()
      //const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      //console.log(loggedUserJSON)

      // Set state
      dispatch(clearUser())

      navigate('/')

      // Show logout message
      const messageLogout = 'Logged out successfully!'
      dispatch(showMessage({ text: messageLogout, type: 'success' }, 5))
    } catch (error) {
      // Handle potential errors
      console.error('Logout failed:', error)

      // Show error message
      const errorMessage = 'An error occurred during logout. Please try again.'
      dispatch(showMessage({ text: errorMessage, type: 'error' }, 5))
    }
  }

  return { handleLogout }
}

export default useLogout
