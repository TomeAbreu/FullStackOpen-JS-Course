import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdoteReducer'

//Store that stores the state and uses the reducer anecdoteReducer to handle actions
//to change the state
const store = createStore(anecdotesReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
