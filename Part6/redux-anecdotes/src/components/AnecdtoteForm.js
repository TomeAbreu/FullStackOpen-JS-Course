import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
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
