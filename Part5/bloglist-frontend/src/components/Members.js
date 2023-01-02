import React from 'react'
import Member from './Member'

const Members = ({ members }) => {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Member key={member.id} member={member}>
              {' '}
            </Member>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Members
