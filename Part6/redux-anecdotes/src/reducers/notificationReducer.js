import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  //Define type parameter showNotification will have: notification/showNotificiation
  name: 'notification',
  //Initial State of the Reducer
  initialState: 'Notification content',
  //Reducers Functions that handle state
  reducers: {
    showNotification(state, action) {
      return state
    },
  },
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
