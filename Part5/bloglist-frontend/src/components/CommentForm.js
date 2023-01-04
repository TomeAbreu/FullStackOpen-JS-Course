import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { addCommentToBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = () => {
  const [commentContent, setCommentContent] = useState('')

  //Dispatch object to update state in redux store
  const dispatch = useDispatch()

  const blogId = useParams().id

  const changeContentEvent = (event) => {
    setCommentContent(event.target.value)
  }

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault()
    const comment = {
      content: commentContent,
    }
    //Make request to add comment to blog
    const blogWithAddedComment = await blogService.addComment(comment, blogId)

    //Update comments of blog in store
    dispatch(addCommentToBlog(blogWithAddedComment))
  }

  return (
    <div>
      {' '}
      <form onSubmit={handleNewCommentSubmit}>
        <div>
          comment:{' '}
          <input onChange={changeContentEvent} value={commentContent} />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
