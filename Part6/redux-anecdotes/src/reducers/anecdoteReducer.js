//Reducer uses actions  and a state to change to a new state
//Actions are used to change the state in a redux store
//state=initialState tells reducer the default state in the store

import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  //Define type parameter showNotification will have: notification/showNotificiation
  name: 'anecdotes',
  //Initial State of the Reducer
  initialState: initialState,
  //Reducers Functions that handle state
  reducers: {
    //Create Note action creator
    createNote(state, action) {
      //Action Payload contains the argument provided by calling the action creator
      //Example: dispatch(showNotification('Redux Toolkit is awesome!'))
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    //Increase Vote action creator
    increaseVote(state, action) {
      const id = action.payload
      const anecdoteToIncreaseVote = state.find((n) => n.id === id)
      const increasedAnecdote = {
        ...anecdoteToIncreaseVote,
        votes: anecdoteToIncreaseVote.votes + 1,
      }
      return state.map((note) => (note.id !== id ? note : increasedAnecdote))
    },
    //Filter change action creator
    filterChange(state, action) {
      const filterValue = action.payload
      return state.filter((anecdote) => anecdote.content.includes(filterValue))
    },
    //Action creator to append a anecdote
    appendAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    //Action creator to set Anecdotes
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

//A module can have only one default export, but multiple "normal" exports
export const {
  createNote,
  increaseVote,
  filterChange,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
