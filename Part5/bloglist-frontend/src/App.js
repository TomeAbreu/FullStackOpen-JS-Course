import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import Members from './components/Members'
import Member from './components/Member'
import AppMenu from './components/AppMenu'

import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setMembers } from './reducers/membersReducer'
import { setNotificationMessage } from './reducers/notificationReducer'
import { setErrorMessage } from './reducers/errorReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  //Use state variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const newBlogRef = useRef()
  //Get blogs from store instead of internal state
  const blogs = useSelector((state) => state.blogs)

  //Get user from store instead of internal state
  const user = useSelector((state) => state.user)

  //Get users from store instead of internal state
  const members = useSelector((state) => state.members)

  //Get notification of store instead of internal state
  const notificationMessage = useSelector((state) => state.notification)

  //Get error message of store instead of internal state
  const errorMessage = useSelector((state) => state.error)

  //Dispatch action hook
  const dispatch = useDispatch()

  //Use Effect only run when state is empty array(initial rendering):
  //Check if user is logged in in local storage and set state user variable and save token in blogService
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      getAllBlogs()
      getAllUsers()
    }
  }, [])

  //Get all blogs
  const getAllBlogs = async () => {
    //Get all the blogs
    let blogsData = await blogService.getAll()
    blogsData = blogsData.slice()
    const sortedBlogsData = blogsData.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogsData))
  }

  //Get All Users
  const getAllUsers = async () => {
    const usersData = await userService.getAll()
    dispatch(setMembers(usersData))
  }

  //When submit login form button is clicked
  const handleLogin = async (event) => {
    event.preventDefault()
    const userInfo = { username: username, password: password }
    try {
      //Login user
      const user = await userService.login(userInfo)
      //Set user in store
      dispatch(setUser(user))
      //Set user token in blogService
      blogService.setToken(user.token)
      //Save user information in local storage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      //Reset state variables for username and password in the login form
      setUsername('')
      setPassword('')
      //Notification messages in case of success or failure
      dispatch(setNotificationMessage(`Welcome ${username}`))
      //Navigate to home page again
      setTimeout(() => {
        dispatch(setNotificationMessage(null))
      }, 3000)
    } catch (exception) {
      dispatch(setErrorMessage('Wrong user credentials'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 3000)
    }
  }

  const handleLogout = () => {
    //Remove user from local storage and from state
    if (user) {
      window.localStorage.removeItem('loggedBlogAppUser')
      dispatch(setUser(null))
    }
  }

  //Function to handle creation of new blog
  const handleNewBlog = async (blog) => {
    //Access to visibility function to hide form in Toggable component
    newBlogRef.current.toggleVisibility()
    //Send request to blog service to create new blog
    try {
      //Create new blog request
      const newBlog = await blogService.addBlog(blog)

      //set state variables
      dispatch(setBlogs(blogs.concat(newBlog)))

      //Add success notification
      dispatch(
        setNotificationMessage(
          `A new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
      setTimeout(() => {
        dispatch(setNotificationMessage(null))
      }, 3000)
    } catch (exception) {
      //Add notification error message in case of error creating new blog
      dispatch(setErrorMessage('Could not create a new blog'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notificationMessage}
          error={errorMessage}
        ></Notification>
        <form onSubmit={handleLogin}>
          <div>
            {' '}
            username
            <input
              type='text'
              value={username}
              name='Username'
              id='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            {' '}
            password{' '}
            <input
              type='password'
              value={password}
              name='Password'
              id='password'
              onChange={({ target }) => setPassword(target.value)}
            />{' '}
          </div>{' '}
          <button id='login-button' type='submit'>
            login
          </button>{' '}
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <AppMenu logoutCallback={handleLogout}></AppMenu>
        <div>
          <Notification
            message={notificationMessage}
            error={errorMessage}
          ></Notification>
          <div>
            <span>
              {user.username} is logged in{''}
            </span>
          </div>

          <div>
            {/*Form to create a new blog*/}
            <Togglable buttonLabel='new blog' ref={newBlogRef}>
              <NewBlogForm handleNewBlog={handleNewBlog}></NewBlogForm>
            </Togglable>
          </div>
        </div>

        <Routes>
          <Route path='/blogs' element={<Blogs blogs={blogs} />} />
          <Route path='/users' element={<Members members={members} />} />
          <Route path='/users/:id' element={<Member members={members} />} />
          <Route path='/blogs/:id' element={<Blog blogs={blogs} />} />
        </Routes>
      </div>
    )
  }
}

export default App
