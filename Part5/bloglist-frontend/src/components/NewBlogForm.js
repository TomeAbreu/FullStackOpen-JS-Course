import React from 'react'
import { useState } from 'react'

const NewBlogForm = ({ handleNewBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  //Function when creating a new blog
  const addNewBlog = async (event) => {
    event.preventDefault()

    const blogToAdd = { author: blogAuthor, title: blogTitle, url: blogUrl }
    //Execute function in App component to create a new blog and add it to state
    //varialbe blogs in App compoennt
    await handleNewBlog(blogToAdd)

    //Reset state variables for blog fom
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      {' '}
      <h3>Create new blog</h3>
      <form>
        <div>
          {' '}
          title:
          <input
            type='text'
            value={blogTitle}
            name='blogTitle'
            id='blogTitle'
            placeholder='write here blog title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          {' '}
          author:{' '}
          <input
            type='text'
            value={blogAuthor}
            name='blogAuthor'
            id='blogAuthor'
            placeholder='write here blog author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          url:{' '}
          <input
            type='url'
            value={blogUrl}
            name='blogUrl'
            id='blogUrl'
            placeholder='write here blog url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />{' '}
        </div>{' '}
        <button type='button' onClick={addNewBlog}>
          create
        </button>{' '}
      </form>
    </div>
  )
}

export default NewBlogForm
