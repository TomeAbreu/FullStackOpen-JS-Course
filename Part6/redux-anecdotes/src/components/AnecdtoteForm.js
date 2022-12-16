import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    //Dispatch actions using connect dispatch passes as props with ConnectedAnecdoteForm
    props.createAnecdote(content)
    props.showNotificationAction(`You added '${content}'`, 5)
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
//Pass action creators to ConnectedAnecdoteForm component as props
const mapDispatchToProps = {
  createAnecdote,
  showNotificationAction,
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
