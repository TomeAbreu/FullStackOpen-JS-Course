import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import { setErrorMessage } from '../reducers/errorReducer'
import { increaseBlogLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  //Dispatch hook
  const dispatch = useDispatch()

  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const toggleBlogDetails = () => {
    setBlogDetailsVisible(!blogDetailsVisible)
  }

  const handleIncreaseLike = async () => {
    //Make put request to update blog
    try {
      const blogToBeUpdated = {
        id: blog.id,
        author: blog.author,
        url: blog.url,
        title: blog.title,
        likes: blog.likes + 1,
      }
      const blogUpdated = await blogService.updateBlog(blogToBeUpdated)
      dispatch(increaseBlogLike(blogUpdated))
    } catch (error) {
      console.log('ERROR: ', error)
      dispatch(setErrorMessage('Could not update blog'))
    }
  }

  const showDeleteButton = () => (
    <button onClick={handleDeleteBlog}>Delete</button>
  )

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        dispatch(deleteBlog(blog))
      } catch (error) {
        dispatch(setErrorMessage('Could not update blog'))
      }
    }
  }
  const showBlogDetails = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        <span>{blog.likes}</span>
        <button onClick={handleIncreaseLike}>like</button>
      </div>
      {user.username === blog.user.username && showDeleteButton()}
    </div>
  )

  return (
    <div className='blog'>
      <span>{blog.title} </span> <span>{blog.author}</span>
      <button onClick={toggleBlogDetails}>
        {blogDetailsVisible ? 'hide' : 'view'}
      </button>
      {blogDetailsVisible === true && showBlogDetails()}
    </div>
  )
}

export default Blog
