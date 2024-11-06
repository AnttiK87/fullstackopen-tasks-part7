//Refactored some functionalities from App.jsx to hooks. Not sure if this is the correct way to do it.
//Function for handling user loggin in

//dependencies
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const useLogin = (showMessage, setUser, setUsername, setPassword) => {
  //Login error message
  const [errorLogin] = useState('Wrong username or password!')

  //function for handling login
  const handleLogin = async (event, username, password) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      //Set logged in user to localStorage and set token
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      showMessage(errorLogin, 'error')
      setUser(user)

      //Show logged in message
      const messageLogin = `Logged in user ${user.name}`
      showMessage(messageLogin, 'success')

      //Set states
      setUsername('')
      setPassword('')
    } catch (exception) {
      // Show error message if username or passwor were wrong
      showMessage(errorLogin, 'error')
    }
  }

  return { handleLogin }
}

// exports
export default useLogin