import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} has {anecdote.votes} votes{' '}
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  //UseDispatch: Hook to Dispatch Action to Redux Store to change state
  const dispatch = useDispatch()

  //UseSelector: Hook to get state from Redux Store
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  )

  const handleIncreaseVote = (anecdote) => {
    dispatch(increaseVote(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 3000)
  }

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleIncreaseVote(anecdote)}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
