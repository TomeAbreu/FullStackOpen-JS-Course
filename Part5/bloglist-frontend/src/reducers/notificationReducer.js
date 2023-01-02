import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    //Set user action
    setNotificationMessage(state, action) {
      return action.payload
    },
  },
})

export const { setNotificationMessage } = notificationSlice.actions

export default notificationSlice.reducer
