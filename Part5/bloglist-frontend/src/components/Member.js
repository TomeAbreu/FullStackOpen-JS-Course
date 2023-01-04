import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Member = ({ members }) => {
  //Get the parameter from route
  const userId = useParams().id

  //Get the user info
  const member = members.find((el) => el.id === userId)

  return (
    <div>
      <h2>{member.name}</h2>
      <h4>Added Blogs: </h4>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {member.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Member
