import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const OwnProfile = () => {
  const listStyle = {
    listStyleType: 'none',
    paddingLeft: 30,
    marginBottom: 0,
    paddingBottom: 30,
  }

  const padding = {
    padding: 30,
    paddingLeft: 50,
    paddingBottom: 50,
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  //console.log(id)

  const loggedInUser = useSelector((state) => state.user.user)
  //console.log(loggedInUser)

  useEffect(() => {
    if (!loggedInUser) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000) // Navigoi 2 sekunnin viiveellä

      return () => clearTimeout(timer) // Tyhjennetään aikakatkaisu komponentin poistuessa
    } else {
      console.log(id)
      dispatch(getUser(id))
    }
  }, [navigate, dispatch, id])

  const user = useSelector((state) => state.user.selectedUser)
  //console.log(user)

  if (!user) {
    return <div>Loading...</div> // Lisätty yksinkertainen latausindikaattori
  }

  if (!loggedInUser) {
    return <div style={padding}>You are not logged in!</div>
  }

  const isOwnProfile = loggedInUser.id === user.id

  return (
    <div style={padding}>
      <h3>{user.name}</h3>
      <h4>{isOwnProfile ? 'You have added blogs:' : 'Added blogs:'}</h4>
      <ul style={listStyle}>
        {user.blogs && user.blogs.length === 0 ? (
          <li>No added blogs</li>
        ) : (
          user.blogs?.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default OwnProfile
