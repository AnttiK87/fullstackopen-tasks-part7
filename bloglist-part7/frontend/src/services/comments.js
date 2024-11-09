//HTTP reguests for handling comments

//dependencies
import axios from 'axios'

const baseUrl = '/api/comments'

// retrieve all comment
const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
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
export default { getAll, create }
