import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove } from '../reducers/blogReducer.js'
import { useParams, useNavigate } from 'react-router-dom'
import { createComment, initializeComments } from '../reducers/commentReducer'
import { Form, Button } from 'react-bootstrap'

const Blog = () => {
  const listStyle = {
    marginTop: 30,
    marginBottom: 0,
    paddingBottom: 30,
  }

  const padding = {
    padding: 30,
    paddingLeft: 50,
    paddingBottom: 50,
  }

  const paddingLeft = {
    paddingLeft: 30,
    paddingTop: 15,
  }

  const width = {
    width: 400,
  }

  const noMargin = {
    margin: 0,
    marginLeft: 0,
  }

  const left = {
    margin: 0,
    marginLeft: 30,
  }

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const comments = useSelector((state) => state.comment.comments)
  const commentsForBlog = blog ? comments.filter((comment) => comment.blog.id === blog.id) : []

  const user = useSelector((state) => state.user.user)

  const [deleteVisible, setDeleteVisible] = useState(false)

  useEffect(() => {
    // Alusta kommentit aina komponentin latautuessa
    dispatch(initializeComments())

    // Navigoi kotisivulle 2 sekunnin viiveellä, jos käyttäjä ei ole kirjautunut
    if (!user) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)
      return () => clearTimeout(timer)
    }

    console.log(`blog user = ${blog?.user?.id}`)
    console.log(`user = ${user?.id}`)
    if (blog?.user?.id === user?.id) {
      setDeleteVisible(true)
    } else {
      setDeleteVisible(false)
      console.log(`delete state = ${deleteVisible}`)
    }
  }, [dispatch, user, navigate, blog])

  if (!user) {
    return <div style={padding}>You are not logged in!</div>
  }

  if (!blog) {
    return <div>Loading...</div>
  }

  const showDeleteButton = { display: deleteVisible ? '' : 'none' }

  const addComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    const addComment = {
      comment: comment,
      blog: blog.id,
    }

    dispatch(createComment(addComment))

    event.target.reset()
  }

  return (
    <div style={padding}>
      <h2>
        {blog.title} by author: {blog.author}
      </h2>
      <div style={paddingLeft}>
        <div>
          <b>Link to the blog: </b> <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          <b>Likes: </b> {blog.likes}
        </div>
        <div className={'lastStyle'}>
          <b>Added by: </b> {blog.user.name}
        </div>
      </div>
      <div className={'lastStyle'}>
        <Button
          variant="primary"
          className="Button"
          style={(noMargin, left)}
          onClick={() => dispatch(like(blog))}
        >
          Like
        </Button>

        <Button
          variant="primary"
          style={showDeleteButton}
          className={'delButton buttonWidth'}
          onClick={() => {
            dispatch(remove(blog))
            navigate('/')
          }}
        >
          Delete
        </Button>
      </div>
      <h2> Comments</h2>
      <div style={paddingLeft} className="paddingLeft">
        <Form onSubmit={addComment}>
          <Form.Group style={width} className="form-group paddingLeft">
            <Form.Control
              style={noMargin}
              type="text"
              id="comment"
              data-testid="comment"
              name="comment"
              placeholder="write comment here"
            />
          </Form.Group>
          <Button variant="primary" style={noMargin} className="Button" type="submit">
            Add
          </Button>
        </Form>
        <ul style={listStyle}>
          {commentsForBlog.length === 0 ? (
            <li>No comments added</li>
          ) : (
            commentsForBlog.map((comment) => <li key={comment.id}>{comment.comment}</li>)
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
