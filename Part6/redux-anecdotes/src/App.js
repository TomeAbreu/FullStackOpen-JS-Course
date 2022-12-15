import AnecdoteForm from './components/AnecdtoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
  //UseDispatch Hook
  const dispatch = useDispatch()

  //UseEffect Hook to dispatch async action creator initializeNotes
  useEffect(() => {
    dispatch(initializeNotes())
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
