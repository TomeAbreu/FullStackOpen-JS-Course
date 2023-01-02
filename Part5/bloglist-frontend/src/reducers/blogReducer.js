import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    //Add blog to state
    appendBlog(state, action) {
      state.push(action.payload)
    },
    //Set blogs
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export default blogSlice.reducer
