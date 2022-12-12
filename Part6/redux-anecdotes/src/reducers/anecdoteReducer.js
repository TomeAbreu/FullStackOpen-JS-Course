const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0,
  }
}

//Initial state in the application
const initialState = anecdotesAtStart.map(asObject)

//Reducer uses actions  and a state to change to a new state
//Actions are used to change the state in a redux store
//state=initialState tells reducer the default state in the store
const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INCREASE_VOTE':
      const id = action.data.id
      const anecdoteToIncreaseVote = state.find((n) => n.id === id)
      const increasedAnecdote = {
        ...anecdoteToIncreaseVote,
        votes: anecdoteToIncreaseVote.votes + 1,
      }
      return state.map((note) => (note.id !== id ? note : increasedAnecdote))
    default:
      return state
  }
}

//Functions that create actions are called action creators

//Action creator createNote
export const createNote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: generateId(),
    },
  }
}

//Action creator increaseVote
export const increaseVote = (id) => {
  return {
    type: 'INCREASE_VOTE',
    data: { id },
  }
}

//A module can have only one default export, but multiple "normal" exports

export default anecdoteReducer
