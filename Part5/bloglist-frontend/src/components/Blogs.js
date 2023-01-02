import React from 'react'
import Blog from '../components/Blog'

const Blogs = ({ blogs, user }) => {
  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} user={user}>
              {' '}
            </Blog>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
