//OwnProfile component for rendering blogs added by specific user or so called own profile
//dependencies
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const OwnProfile = () => {
  /*TODO refactor style to .css file*/
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

  //set dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get blog id from url
  const { id } = useParams()
  //console.log(id)

  //get user state
  const loggedInUser = useSelector((state) => state.user.user)
  //console.log(loggedInUser)

  //navigate to home screen if user is not logged in
  useEffect(() => {
    if (!loggedInUser) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      //set user whose info will be visible
      //console.log(id)
      dispatch(getUser(id))
    }
  }, [navigate, dispatch, id])

  //get user whose info to be shown
  const user = useSelector((state) => state.user.selectedUser)
  //console.log(user)

  //Show loading screen if user is not set
  if (!user) {
    return <div>Loading...</div>
  }

  //show info if user is not logged in
  if (!loggedInUser) {
    return <div style={padding}>You are not logged in!</div>
  }

  //determine if user is looking own profile or not
  const isOwnProfile = loggedInUser.id === user.id

  // rendering user info screen
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
