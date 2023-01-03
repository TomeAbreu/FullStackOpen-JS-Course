import React from 'react'
import { useParams } from 'react-router-dom'

const Member = ({ members }) => {
  //Get the parameter from route
  const userId = useParams().id

  //Get the user info
  const member = members.find((el) => el.id === userId)

  return (
    <div>
      <h2>{member.name}</h2>
      <h4>Added Blogs: </h4>
      <ul>
        {member.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Member
