import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    //Set user action
    setErrorMessage(state, action) {
      return action.payload
    },
  },
})

export const { setErrorMessage } = errorSlice.actions

export default errorSlice.reducer
