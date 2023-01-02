import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const membersSlice = createSlice({
  name: 'members',
  initialState: initialState,
  reducers: {
    //Set user action
    setMembers(state, action) {
      return action.payload
    },
  },
})

export const { setMembers } = membersSlice.actions

export default membersSlice.reducer
