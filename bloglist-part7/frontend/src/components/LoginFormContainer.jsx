//for setting states of the login form and functionality for showing it or not

//dependencies
import { useState } from 'react'
import LoginForm from './LoginForm'

const LoginFormContainer = ({ handleLogin }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // functionality for showing or not the form by css style display
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        {/* Button for showing login form */}
        <button onClick={() => setLoginVisible(true)}>Login</button>
      </div>
      <div style={showWhenVisible}>
        {/* transfering props for LoginForm component */}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={(event) => {
            handleLogin(event, username, password)
            setUsername('')
            setPassword('')
          }}
        />
        {/* Button for hiding login form */}
        <button onClick={() => setLoginVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

// exports
export default LoginFormContainer