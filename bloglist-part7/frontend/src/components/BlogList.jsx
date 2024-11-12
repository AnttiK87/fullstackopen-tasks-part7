//component for rendering the "main screen" of blog application

//dependencies
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogList = ({ /*props*/ blogFormRef }) => {
  /*TODO refactor style to .css file*/
  const margin = {
    marginTop: 10,
  }

  const listStyle = {
    listStyleType: 'none',
    paddingLeft: 30,
  }

  const marginHeader = {
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: 30,
  }

  //get blogs state
  const blogs = useSelector((state) => state.blogs)
  //console.log(blogs)

  // render the blog list
  return (
    <>
      <div style={margin}>
        {/* Using togglable component to show blog form for adding new blogs. */}
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
      <h3 style={marginHeader}>Blog list</h3>
      <ul style={listStyle}>
        {blogs.length === 0 ? (
          <li>No added blogs</li>
        ) : (
          blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li className="blogStyle" key={blog.id}>
                <Link to={`/blog/${blog.id}`}>
                  <b>Title: </b> {blog.title}, <b>Author: </b> {blog.author}
                </Link>
              </li>
            ))
        )}
      </ul>
    </>
  )
}

BlogList.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}
// exports
export default BlogList
