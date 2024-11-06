/* Refactored these fuctions of handling blogs here.
Not sure if this was correct way of doing it.*/

//dependecies
import blogService from './blogs'

// function for adding blog
const addBlog = async (blogObject, setBlogs, showMessage, blogFormRef) => {
  const messageBlogAdded = `Added a new blog ${blogObject.title} by ${blogObject.author} to the list!`

  blogFormRef.current.toggleVisibility()
  try {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
    showMessage(messageBlogAdded, 'success')
  } catch (error) {
    const errorMessage = error.response && error.response.data.error
      ? error.response.data.error
      : 'Failed to add blog'

    showMessage(errorMessage, 'error')
  }
}

// function for updating blog
const updateBlog = async (blogs, setBlogs, showMessage, id) => {
  const errorMessage = 'Something went wrong!'
  const blog = await blogs.find(b => b.id === id)

  if (!blog) {
    showMessage('Blog not found', 'error')
    return
  }

  const changedBlog = { ...blog, likes: blog.likes + 1 }

  try {
    const returnedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(b => (b.id !== id ? b : returnedBlog)))
  } catch (error) {
    const errorResponseMessage = error.response && error.response.data.error
      ? error.response.data.error
      : errorMessage

    showMessage(errorResponseMessage, 'error')
  }
}

// function for deleting blog
const deleteBlog = async (blogs, setBlogs, showMessage, id) => {
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    showMessage('Blog not found', 'error')
    return
  }

  const messageDeleted = `${blog.title} by ${blog.author} deleted from the list!`
  const errorMessage = `${blog.title} by ${blog.author} was already deleted from the list!`

  if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showMessage(messageDeleted, 'success')
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Failed to delete blog', error)
        showMessage(errorMessage, 'error')
        setBlogs(blogs.filter(blog => blog.id !== id))
      } else {
        showMessage('An unexpected error occurred', 'error')
      }
    }
  }
}

// exports
export { addBlog, updateBlog, deleteBlog }