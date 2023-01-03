import React from 'react'
import { Link } from 'react-router-dom'

const Members = ({ members }) => {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Link to={`/users/${member.id}`}>{member.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Members
