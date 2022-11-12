import axios from 'axios'
const baseUrl = '/api'

const login = async (userCredentials) => {
  const response = await axios.post(baseUrl + '/login', userCredentials)
  return response.data
}

export default { login }
