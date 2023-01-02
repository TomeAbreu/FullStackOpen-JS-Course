import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import membersReducer from './reducers/membersReducer'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    members: membersReducer,
    notification: notificationReducer,
    error: errorReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
