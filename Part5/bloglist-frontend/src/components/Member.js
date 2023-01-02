import React from 'react'

const Member = ({ member }) => {
  console.log('MEMBER: ', member)
  return (
    <div>
      <span>{member.name}</span> <span>{member.blogs.length}</span>
    </div>
  )
}

export default Member
