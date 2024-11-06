//for rendering the main screen of blog application

//dependencies
import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ user, blogs, handleLogout, addBlog, deleteBlog, updateBlog, blogFormRef }) => {
  return (
    <>
      <div>
        <p>
          {/* Showing logged in user and logout button */}
          {user.name} is logged in.
          <button onClick={handleLogout} type="submit">Logout</button>
        </p>

        {/* Using togglable component to show blog form for adding new blogs. */}
        <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

      </div>
      <h3>Blog list</h3>
      <ul>
        {/* Sorting blogs to the list according likes count. */}
        {blogs.sort((a, b) => b.likes - a.likes).map((blog, i) =>
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={() => deleteBlog(blog.id)}
            addLike={() => updateBlog(blog.id)}
            user={user}
          />
        )}
      </ul>
    </>
  )
}

// exports
export default BlogList