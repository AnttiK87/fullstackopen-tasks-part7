//for rendering the main structure of the blog application

//dependencies
import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import { addBlog, updateBlog, deleteBlog } from './services/blogsHelper'

import useShowMessage from './hooks/showMessage'
import useLogin from './hooks/useLogin'
import useLogout from './hooks/useLogout'

import LoginFormContainer from './components/LoginFormContainer'
import BlogList from './components/BlogList'
import Notification from './components/Notification'


const App = () => {
  //states variables
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // for showing messages
  const { errorMessage, messageType, showMessage } = useShowMessage()

  // for handling login and logout
  const { handleLogin } = useLogin(showMessage, setUser, setUsername, setPassword)
  const { handleLogout } = useLogout(showMessage, setUser)

  // to control blogForm visibility
  const blogFormRef = useRef()

  // fetching all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // check if a user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // call function for adding blog
  const handleAddBlog = (blogObject) => {
    addBlog(blogObject, setBlogs, showMessage, blogFormRef)
  }

  // call function for updating blog
  const handleUpdateBlog = (id) => {
    updateBlog(blogs, setBlogs, showMessage, id)
  }

  // call function for deleting blog
  const handleDeleteBlog = (id) => {
    deleteBlog(blogs, setBlogs, showMessage, id)
  }

  //Rendering the main structure
  return (
    <div>
      <h1>The List of Blogs</h1>
      <Notification message={errorMessage} type={messageType}/>

      {/* Showing login screen if user is not set */}
      {!user && <LoginFormContainer handleLogin={handleLogin} />}
      {/* Showing main screen if user is set */}
      {user && <BlogList
        user={user}
        blogs={blogs}
        handleLogout={handleLogout}
        addBlog={handleAddBlog}
        deleteBlog={handleDeleteBlog}
        updateBlog={handleUpdateBlog}
        blogFormRef={blogFormRef}
      />}
    </div>
  )
}

// exports
export default App