//for rendering the main screen of blog application
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector((state) => state.user.users)
  //console.log(users)

  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000) // Navigoi 2 sekunnin viiveellä

      return () => clearTimeout(timer) // Tyhjennetään aikakatkaisu komponentin poistuessa
    }
  }, [user, navigate])

  if (!user) {
    return <div style={padding}>You are not logged in!</div>
  }

  if (!users) {
    return null // Palauta tyhjä div tai muu, kun käyttäjä ei ole vielä saatavilla
  }

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
