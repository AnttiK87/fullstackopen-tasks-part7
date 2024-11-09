// components/Menu.js
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLogout from '../hooks/useLogout'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Menu = ({ setLoginVisible, setRegisterVisible }) => {
  const user = useSelector((state) => state.user.user)
  const { handleLogout } = useLogout()
  const navigate = useNavigate()

  const containerStyle = {
    backgroundColor: '#a5a58d',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }

  const containerStyle2 = {
    backgroundColor: '#a5a58d',
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  }

  const nameAndButtonStyle = {
    marginLeft: 'auto',
    marginRight: 30,
  }

  const padding = {
    padding: 10,
    color: 'black',
  }

  const noMargin = {
    margin: 0,
    marginLeft: 10,
  }

  if (!user) {
    return (
      <div style={containerStyle2}>
        <button
          className="button-as-link"
          onClick={() => {
            navigate('/')
            setRegisterVisible(false)
            setLoginVisible(true)
          }}
        >
          Login
        </button>
        <button
          className="button-as-link"
          onClick={() => {
            navigate('/')
            setRegisterVisible(true)
            setLoginVisible(false)
          }}
        >
          Register
        </button>
      </div>
    )
  }

  return (
    <Navbar style={containerStyle} collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-container mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              Home
            </Link>
          </Nav.Link>
          <div className="lines">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
          </div>
          <Nav.Link href="#" as="span">
            <Link style={padding} to={`/users/${user.id}`}>
              Own profile
            </Link>
          </Nav.Link>
          <Nav.Link style={nameAndButtonStyle} href="#" as="span">
            <div>
              {user.name} is logged in.
              <Button
                style={noMargin}
                variant="primary"
                className="Button"
                onClick={handleLogout}
                type="submit"
              >
                Logout
              </Button>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Menu.propTypes = {
  setLoginVisible: PropTypes.func.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default Menu
