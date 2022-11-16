import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from '../components/NewBlogForm'

test('renders blog author and title  but does not render its url or number of likes by default', () => {
  const blog = {
    author: 'Tome',
    title: 'Component blog testing  title',
    url: 'https://pdsdsds.com',
    likes: 20,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent('Component blog testing title')
  expect(div).toHaveTextContent('Tome')
  expect(div).not.toHaveTextContent('https://pdsdsds.com')
  expect(div).not.toHaveTextContent(20)
})

test('cliking in view detais blog button will show likes and url', async () => {
  const blog = {
    author: 'Tome',
    title: 'Component blog testing  title',
    url: 'https://pdsdsds.com',
    likes: 20,
    user: {
      username: 'motu',
    },
  }

  const user = {
    username: 'motu',
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  // A session is started to interact with the rendered component:
  const userEventSession = userEvent.setup()
  const button = screen.getByText('view')
  await userEventSession.click(button)

  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent('https://pdsdsds.com')
  expect(div).toHaveTextContent(20)
})

test('cliking in likes button two times props event handler is received 2 times', async () => {
  const blog = {
    author: 'Tome',
    title: 'Component blog testing  title',
    url: 'https://pdsdsds.com',
    likes: 20,
    user: {
      username: 'motu',
    },
  }

  const user = {
    username: 'motu',
  }

  const updateBlogLikes = jest.fn()

  //Render Component
  render(
    <Blog blog={blog} user={user} updateBlogLikesCallBack={updateBlogLikes} />
  )

  // A session is started to interact with the rendered component:
  const userEventSession = userEvent.setup()
  const buttonBlogDetails = screen.getByText('view')
  await userEventSession.click(buttonBlogDetails)

  const buttonLikes = screen.getByText('like')

  //Click button like 2 times
  await userEventSession.click(buttonLikes)
  await userEventSession.click(buttonLikes)

  expect(updateBlogLikes.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleNewBlog={createBlog} />)

  const input = screen.getByPlaceholderText('write here blog title')
  const input1 = screen.getByPlaceholderText('write here blog author')
  const input2 = screen.getByPlaceholderText('write here blog url')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a new blog title...')
  await user.type(input1, 'testing a new blog author...')
  await user.type(input2, 'testing a new blog url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe(
    'testing a new blog title...'
  )
  expect(createBlog.mock.calls[0][0].content).toBe(
    'testing a new blog author...'
  )
  expect(createBlog.mock.calls[0][0].content).toBe('testing a new blog url...')
})
