//HTTP reguests for handling blogs

//dependencies
import axios from 'axios'

const baseUrl = '/api/users'

// retrieve all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// create new comment
const create = async (newObject) => {
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject)
  console.log(response.data)
  return response.data
}

// exports
export default { getAll, getUserById, create }
