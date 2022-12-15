import AnecdoteForm from './components/AnecdtoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  //UseDispatch Hook
  const dispatch = useDispatch()

  //UseEffect Hook to get anecdotes from the service and dispatch to initialize state of anecdotes
  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => {
      console.log('Get ANECDOTES FROM SERVER: ', anecdotes)
      dispatch(setAnecdotes(anecdotes))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
