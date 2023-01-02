import React from 'react'

const Member = ({ member }) => {
  return (
    <div>
      <span>{member.name}</span>{' '}
      <span>
        <b>{member.blogs.length}</b>
      </span>
    </div>
  )
}

export default Member
