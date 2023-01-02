import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from 'redux'
import { Provider } from 'react-redux'

import blogReducer from './reducers/blogReducer'

const store = configureStore(blogReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
