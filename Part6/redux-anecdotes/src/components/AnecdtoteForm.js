import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNote(newAnecdote))
    dispatch(showNotification(`You added '${content}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 3000)
  }

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
