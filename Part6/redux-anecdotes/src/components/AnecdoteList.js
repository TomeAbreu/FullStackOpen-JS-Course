import { useDispatch, useSelector } from 'react-redux'
import { increaseVoteAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationAction } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector((state) => state.anecdotes).slice()
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const handleIncreaseVote = (anecdote) => {
    const anecdoteToBeUpdated = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(increaseVoteAnecdote(anecdoteToBeUpdated))
    dispatch(showNotificationAction(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <ul>
      {sortedAnecdotes.map((anecdote) => (
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
