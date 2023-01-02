import axios from 'axios'
const baseUrl = '/api'

const login = async (userCredentials) => {
  const response = await axios.post(baseUrl + '/login', userCredentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl + '/users')
  return response.data
}

export default { login, getAll }
