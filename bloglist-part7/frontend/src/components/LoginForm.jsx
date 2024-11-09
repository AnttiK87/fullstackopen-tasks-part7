//dependencies
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword } from '../reducers/userReducer.js'
import useLogin from '../hooks/useLogin'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  // Haetaan käyttäjänimi ja salasana Redux-tilasta
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  // get handleLogin
  const { handleLogin } = useLogin()

  const margin = {
    marginLeft: 60,
    marginTop: 30,
  }

  const marginBottom = {
    marginBottom: 20,
  }

  return (
    <div style={margin}>
      <h2 style={marginBottom}>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group className="form-group">
          <Form.Label htmlFor="username">Username: </Form.Label>
          <Form.Control
            id="username"
            data-testid="username"
            type="text"
            value={username}
            onChange={(event) => dispatch(setUsername(event.target.value))}
          />
        </Form.Group>
        <Form.Group style={marginBottom} className="form-group">
          <Form.Label htmlFor="password">Password: </Form.Label>
          <Form.Control
            id="password"
            data-testid="password"
            type="password"
            value={password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
        </Form.Group>
        <Button variant="primary" className="Button" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
