import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  //Define type parameter showNotification will have: notification/showNotificiation
  name: 'notification',
  //Initial State of the Reducer
  initialState: initialState,
  //Reducers Functions that handle state
  reducers: {
    showNotification(state, action) {
      //Action Payload contains the argument provided by calling the action creator
      //Example: dispatch(showNotification('Redux Toolkit is awesome!'))
      const message = action.payload
      state = message
      return state
    },
  },
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
