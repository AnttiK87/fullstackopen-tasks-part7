//HTTP reguests for handling blogs

//dependencies
import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

//set logged in users token
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// retrieve all blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create new blog
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// update the blog
const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

// delete the blog
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

// exports
export default { getAll, create, setToken, update, remove }