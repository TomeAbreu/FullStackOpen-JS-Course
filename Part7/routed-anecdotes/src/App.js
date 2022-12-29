import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useField } from './hooks'
import { Table, Form, Button } from 'react-bootstrap'
import { Container } from '@mui/material'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>
                Anecdotes
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/create'>
                Create
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/about'>
                About
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/create'
          element={<CreateNew addNew={(anecdote) => addNew(anecdote)} />}
        />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  //Hook to get object id from route
  const anecdoteId = useParams().id

  const anecdote = anecdotes.find(
    (anecdote) => anecdote.id === Number(anecdoteId)
  )
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  //Inputs withs custom field Hook
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  //React hook to change programatically the router route
  const navigate = useNavigate()

  const handleOnReset = (e) => {
    e.preventDefault()
    content.onReset()
    info.onReset()
    author.onReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control
            type={content.type}
            name='content'
            onChange={content.onChange}
            value={content.value}
          ></Form.Control>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type={author.type}
            name='author'
            onChange={author.onChange}
            value={author.value}
          ></Form.Control>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type={info.type}
            name='info'
            onChange={info.onChange}
            value={info.value}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          create
        </Button>
        <Button variant='secondary' onClick={handleOnReset}>
          reset
        </Button>
      </Form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    let anecdoteToAdd = {
      content: anecdote.content.value,
      author: anecdote.author.value,
      info: anecdote.info.value,
      votes: anecdote.votes,
      id: anecdote.id,
    }
    setAnecdotes(anecdotes.concat(anecdoteToAdd))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <Container>
      <div>
        <h1>Software anecdotes</h1>
        <Menu anecdotes={anecdotes} addNew={(anecdote) => addNew(anecdote)} />

        <Footer />
      </div>
    </Container>
  )
}

export default App
