//Login form container component. for detemining if info text, login form or register form is shown for user
//dependencies
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from 'react-bootstrap'

const LoginFormContainer = ({
  //props
  loginVisible,
  setLoginVisible,
  registerVisible,
  setRegisterVisible,
}) => {
  /*TODO refactor style to .css file*/
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

  //display styles for showing or not showing forms
  const hideWhenVisible = { display: loginVisible || registerVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible || registerVisible ? '' : 'none' }

  // rendering one of the forms or info text (info text is default)
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

//proptypes check
LoginFormContainer.propTypes = {
  loginVisible: PropTypes.bool.isRequired,
  setLoginVisible: PropTypes.func.isRequired,
  registerVisible: PropTypes.bool.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default LoginFormContainer
