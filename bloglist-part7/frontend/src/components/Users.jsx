//users component for rendering list of users
//dependencies
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
  /*TODO refactor style to .css file*/
  const left = {
    textAlign: 'left',
  }

  const center = {
    textAlign: 'center',
  }

  const padding = {
    padding: 30,
    paddingLeft: 50,
    paddingBottom: 50,
  }

  //set dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //initilaize users state
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  //get users state
  const users = useSelector((state) => state.user.users)
  //console.log(users)

  /*TODO: check for logged in user should probably be refactored to own component*/
  //get ulogged in user
  const user = useSelector((state) => state.user.user)

  //navigate to home screen if user is not logged in
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [user, navigate])

  //show info if user is not logged in
  if (!user) {
    return <div style={padding}>You are not logged in!</div>
  }

  //Show loading screen if users is not set yet
  if (!users) {
    return <div>Loading...</div>
  }

  /*rendering users screen and how many blogs that user has added sorted user with most added blogs to be first*/
  return (
    <div style={padding}>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th style={left}>Name</th>
            <th style={center}>Number of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users
            .slice()
            .sort((a, b) => (b.blogs?.length || 0) - (a.blogs?.length || 0))
            .map((user) => (
              <tr key={user.id}>
                <td style={left}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td style={center}>{user?.blogs?.length || 0}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

// exports
export default Users
