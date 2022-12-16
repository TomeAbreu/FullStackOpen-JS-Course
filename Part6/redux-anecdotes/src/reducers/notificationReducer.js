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

//Export reducer method  inside slice
export const { showNotification } = notificationSlice.actions

// //Async Action creator to showNotification and update state of notification
// using Redux Thunk library
export const showNotificationAction = (message, awaitTime) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    await setNotificationTimer(awaitTime * 1000)
    dispatch(showNotification(null))
  }
}
//Promise to wait for timer to reset notification to null
//resolve will be called when time is done and await will consume resolve method of Promise
const setNotificationTimer = (time) =>
  new Promise((resolve) => setTimeout(resolve, time))

export default notificationSlice.reducer
