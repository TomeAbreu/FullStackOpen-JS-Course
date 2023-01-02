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
    //Increase likes in blog
    increaseBlogLike(state, action) {
      const blogToBeUpdated = action.payload
      return state.map((blog) =>
        blog.id === blogToBeUpdated.id ? blogToBeUpdated : blog
      )
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload

      return state.filter((blog) => blog.id !== blogToDelete.id)
    },
  },
})

export const { appendBlog, setBlogs, increaseBlogLike, deleteBlog } =
  blogSlice.actions

export default blogSlice.reducer
