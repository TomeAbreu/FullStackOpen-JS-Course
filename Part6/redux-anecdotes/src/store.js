import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'

//Creating store using Redux Toolkit's configureStore method
const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
  },
})

export default store
