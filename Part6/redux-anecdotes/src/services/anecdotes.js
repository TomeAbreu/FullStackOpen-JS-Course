import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

//Get all anecdotes
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//Create new anecdote
const createNew = async (content) => {
  const object = { content: content, id: generateId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }
