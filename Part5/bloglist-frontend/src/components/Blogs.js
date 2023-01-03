import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
