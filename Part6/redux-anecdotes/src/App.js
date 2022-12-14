import AnecdoteForm from './components/AnecdtoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
