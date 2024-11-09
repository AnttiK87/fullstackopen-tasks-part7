//Refactored some functionalities from App.jsx to hooks. Not sure if this is the correct way to do it.
//Function for handling user loggin in

//dependencies
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser, setUsername, setPassword } from '../reducers/userReducer.js'
import { showMessage } from '../reducers/messageReducer'

const useLogin = () => {
  const dispatch = useDispatch()

  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      //console.log(user)

      // Set logged in user to localStorage and set token
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))

      // Show logged in message
      dispatch(showMessage({ text: `Logged in user ${user.name}`, type: 'success' }, 5))

      // Reset username and password in Redux state
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      var errorMessage

      if (exception.response && exception.response.status === 401) {
        errorMessage = 'Wrong username or password!'
      } else if (exception.response) {
        errorMessage = `Error: ${exception.response.data.error}`
      } else {
        errorMessage = 'Network error'
      }

      dispatch(showMessage({ text: errorMessage, type: 'error' }, 5))
    }
  }

  return { handleLogin }
}

export default useLogin
