import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogLikesCallBack, deleteBlogCallBack, user }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const toggleBlogDetails = () => {
    setBlogDetailsVisible(!blogDetailsVisible)
  }

  const handleIncreaseLike = async () => {
    blog.likes = blog.likes + 1

    //Make put request to update blog
    try {
      const blogToBeUpdated = {
        id: blog.id,
        author: blog.author,
        url: blog.url,
        title: blog.title,
        likes: blog.likes,
      }
      const blogUpdated = await blogService.updateBlog(blogToBeUpdated)
      updateBlogLikesCallBack(blog.id, blogUpdated.likes)
    } catch (error) {
      console.log('Error updating blog')
    }
  }

  const showDeleteButton = () => (
    <button onClick={handleDeleteBlog}>Delete</button>
  )

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        deleteBlogCallBack(blog.id)
      } catch (error) {
        console.log('Error removing blog')
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
