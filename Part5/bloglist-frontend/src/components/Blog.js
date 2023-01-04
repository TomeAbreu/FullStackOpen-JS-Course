import React from 'react'
import blogService from '../services/blogs'
import { setErrorMessage } from '../reducers/errorReducer'
import { increaseBlogLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ blogs }) => {
  //Dispatch hook
  const dispatch = useDispatch()

  //Get user from store
  const user = useSelector((state) => state.user)

  //Get blogId from route
  const blogId = useParams().id

  //Get the right blog
  const blog = blogs.find((blog) => blog.id === blogId)

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

  return (
    <div className='blog'>
      <span>{blog.title} </span> <span>{blog.author}</span>
      <div>
        <p>{blog.url}</p>
        <div>
          <span>{blog.likes}</span>
          <button onClick={handleIncreaseLike}>like</button>
        </div>
        {user.username === blog.user.username && showDeleteButton()}
        <div>
          <h4>Comments: </h4>
          <CommentForm></CommentForm>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
