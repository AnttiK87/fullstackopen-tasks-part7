//component for rendering form for adding blogs

//dependencies
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  /*TODO refactor styles to .css file*/
  const marginBottom = {
    marginBottom: 10,
    marginLeft: 0,
    width: 80,
  }

  const margin = {
    marginLeft: 30,
    marginTop: 30,
  }

  //set dispatch
  const dispatch = useDispatch()

  // function for sending form content and calling createBlog
  const addBlog = (event) => {
    event.preventDefault()

    const { title, author, url } = event.target.elements

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(blog))

    event.target.reset()
  }

  // rendering the form
  return (
    <div style={margin}>
      <h3>Add new blog to the list</h3>
      <Form onSubmit={addBlog}>
        <Form.Group className="form-group">
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            data-testid="title"
            name="title"
            placeholder="title"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="author">Author:</Form.Label>
          <Form.Control
            type="text"
            id="author"
            data-testid="author"
            name="author"
            placeholder="author"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="url">URL:</Form.Label>
          <Form.Control type="text" id="url" data-testid="url" name="url" placeholder="url" />
        </Form.Group>
        <p></p>
        <Button variant="primary" className="Button" style={marginBottom} type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
