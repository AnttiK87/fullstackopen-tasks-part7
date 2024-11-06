//for rendering blogs

//dependencies
import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const showDeleteButton = { display: deleteVisible ? '' : 'none' }

  //determine if view buton is pressed or not
  const showInfo = () => {
    if (!infoVisible){
      setInfoVisible(true)
      //console.log(blog.user.id)
      //console.log(user.id)

      //If logged in user is creator of the blog show delete button
      if (blog.user.id === user.id) {
        setDeleteVisible(true)
      }
    } else {
      setInfoVisible(false)
      setDeleteVisible(false)
    }
  }

  //if view button isn't pressed then exteded info is not visible
  if (!infoVisible) {
    return (
      <div>
        <div className='blogStyle'>
          <b>Title: </b> {blog.title},  <b>Author: </b> {blog.author} <button onClick={showInfo} >View</button>
        </div>
      </div>
    )
  //if view button is pressed then exteded info is visible
  } else {
    return (
      <div>
        <div className='blogStyle togglableContent'>
          <div><b>Title: </b> {blog.title}</div>
          <div><b>Author: </b> {blog.author}</div>
          <div><b>Link to blog: </b> <a href={blog.url}>{blog.url}</a></div>
          <div><b>Likes: </b> {blog.likes}</div>
          <div className={'lastStyle'}><b>Added by: </b> {blog.user.name}</div>
          <div><button onClick={addLike}>Like</button><button onClick={showInfo} >Hide</button></div>
          <div style={showDeleteButton}><button className={'delButton'} onClick={deleteBlog}>Delete</button></div>
        </div>
      </div>
    )
  }

}

// exports
export default Blog