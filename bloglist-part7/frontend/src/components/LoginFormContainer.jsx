// components/LoginFormContainer.js
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from 'react-bootstrap'

const LoginFormContainer = ({
  loginVisible,
  setLoginVisible,
  registerVisible,
  setRegisterVisible,
}) => {
  const styleText = {
    padding: 100,
    paddingTop: 50,
    marginBottom: 0,
  }

  const cancelButton = {
    width: 100,
    marginBottom: 30,
    marginLeft: 60,
  }

  const hideWhenVisible = { display: loginVisible || registerVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible || registerVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <p style={styleText}>
          A blog application allows users to create, view, like, and comment on blog posts. Users
          can log in, then manage their own posts while also interacting with posts from others. The
          application displays a list of blog entries, ordered by popularity (based on likes). Each
          blog post includes a title, author, and link to original blog, as well as a section for
          user comments.
        </p>
      </div>
      <div style={showWhenVisible}>
        {loginVisible && <LoginForm />}
        {registerVisible && (
          <RegisterForm setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
        )}
        {loginVisible && (
          <Button
            variant="primary"
            className="delButton"
            style={cancelButton}
            onClick={() => setLoginVisible(false)}
          >
            Cancel
          </Button>
        )}
        {registerVisible && (
          <Button
            variant="primary"
            className="delButton"
            style={cancelButton}
            onClick={() => setRegisterVisible(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

LoginFormContainer.propTypes = {
  loginVisible: PropTypes.bool.isRequired,
  setLoginVisible: PropTypes.func.isRequired,
  registerVisible: PropTypes.bool.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default LoginFormContainer
