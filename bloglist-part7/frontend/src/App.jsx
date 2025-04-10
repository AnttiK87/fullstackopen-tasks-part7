//for rendering the main structure of the blog application

//dependencies
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//services
import blogService from './services/blogs'
//components
import LoginFormContainer from './components/LoginFormContainer'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Users from './components/Users'
import OwnProfile from './components/OwnProfile'
import Blog from './components/Blog'
import Footer from './components/footer'
//reducesrs
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
//routes
import { Routes, Route } from 'react-router-dom'

const App = () => {
  //styles
  const bottomBorder = {
    borderBottom: '1px solid black', // Lainausmerkit arvolle
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 30,
    marginBottom: 0,
  }

  const bcColor = {
    backgroundColor: '#f5f0e1',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  }

  //state variables
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)

  //get user state
  const user = useSelector((state) => state.user.user)
  //console.log(user)

  // to control blogForm visibility
  const blogFormRef = useRef()

  //set dispatch
  const dispatch = useDispatch()

  //Initialize blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Check if a user is logged in and set to Redux state if found
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    //console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])
  //console.log(user)

  //Rendering the main structure
  return (
    <div className="container">
      <Menu setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
      <div className="main-content" style={bcColor}>
        <h1 style={bottomBorder}>The List of Blogs</h1>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Showing info/login/register screen if user is not set */}
                {!user && (
                  <LoginFormContainer
                    loginVisible={loginVisible}
                    setLoginVisible={setLoginVisible}
                    registerVisible={registerVisible}
                    setRegisterVisible={setRegisterVisible}
                  />
                )}
                {/* Showing main screen if user is set */}
                {user && <BlogList blogFormRef={blogFormRef} />}
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<OwnProfile />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </div>
      <Footer className="footer" />
    </div>
  )
}

export default App
