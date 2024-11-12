//component for rendering form for registering new user
//dependencies
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer.js'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const RegisterForm = ({ /*props*/ setLoginVisible, setRegisterVisible }) => {
  /*TODO refactor style to .css file*/
  const margin = {
    marginLeft: 60,
    marginTop: 30,
  }

  const marginBottom = {
    marginBottom: 20,
  }

  //set dispatch
  const dispatch = useDispatch()

  //function for sending form content and calling creteBlog
  const addUser = async (event) => {
    event.preventDefault()

    const { username, name, password } = event.target

    const user = {
      username: username.value,
      name: name.value,
      password: password.value,
    }

    // check if creating of user were succesful
    const success = await dispatch(createUser(user))

    //show log in screen if registration were completed
    if (success) {
      setLoginVisible(true)
      setRegisterVisible(false)
      event.target.reset()
    } else {
      //handle error
      console.error('User creation failed')
    }
  }

  // rendering registration form
  return (
    <div style={margin}>
      <h2 style={marginBottom}>Register new user</h2>

      <Form onSubmit={addUser}>
        <Form.Group className="form-group">
          <Form.Label htmlFor="username">Username: </Form.Label>
          <Form.Control
            id="username"
            data-testid="username"
            type="text"
            name="username"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="username">Name: </Form.Label>
          <Form.Control id="name" data-testid="name" type="text" name="name" placeholder="name" />
        </Form.Group>
        <Form.Group style={marginBottom} className="form-group">
          <Form.Label htmlFor="password">Password: </Form.Label>
          <Form.Control
            id="password"
            data-testid="password"
            type="password"
            name="password"
            placeholder="password"
          />
        </Form.Group>
        <Button variant="primary" className="Button" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

//proptypes check
RegisterForm.propTypes = {
  setLoginVisible: PropTypes.func.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default RegisterForm
