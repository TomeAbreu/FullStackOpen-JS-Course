import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import anecdotesReducer, { setAnecdotes } from './reducers/anecdoteReducer'

//Creating store using Redux Toolkit's configureStore method
const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
  },
})

//Dispatch appenNote action to initialize state of anecdtotes
anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes))
})

export default store
