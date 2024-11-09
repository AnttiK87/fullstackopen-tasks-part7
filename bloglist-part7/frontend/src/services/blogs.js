//HTTP reguests for handling blogs

//dependencies
import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

//set logged in users token
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// retrieve all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// create new blog
const create = async (newObject) => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

// update the blog
const update = async (content) => {
  //console.log(content)
  const newObject = { ...content, likes: content.likes + 1 }
  const response = await axios.put(`${baseUrl}/${content.id}`, newObject)
  return response.data
}

// delete the blog
const remove = async (content) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${content.id}`, config)
  return response.data
}

// exports
export default { getAll, create, setToken, update, remove }
