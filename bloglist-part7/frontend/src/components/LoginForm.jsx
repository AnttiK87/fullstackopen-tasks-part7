//for rendering the login screen of blog application

//dependencies
import PropTypes from 'prop-types'

const LoginForm = ({
  //props for login form
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  // rendering the login form
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            data-testid='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            data-testid='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <p></p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

// setting the prop types
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm