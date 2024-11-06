//for rendering form to add blogs

//dependencies
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //function for sending form content and calling creteBlog
  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // rendering the form
  return (
    <div>
      <h3>Add new blog to the list</h3>
      <form onSubmit={addBlog}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-testid='title'
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
            placeholder='title'
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            data-testid='author'
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
            placeholder='author'
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            data-testid='url'
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
            placeholder='url'
          />
        </div>
        <p></p>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

// setting the prop types (createBlog is reguired an it must be a function)
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

// exports
export default BlogForm