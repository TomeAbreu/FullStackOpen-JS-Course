import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  const mockHandler = jest.fn()

  //Render Component
  render(<Blog blog={blog} user={user} updateBlogLikesCallBack={mockHandler} />)

  // A session is started to interact with the rendered component:
  const userEventSession = userEvent.setup()
  const buttonBlogDetails = screen.getByText('view')
  await userEventSession.click(buttonBlogDetails)

  const buttonLikes = screen.getByText('like')
  //Click button like 2 times
  await userEventSession.click(buttonLikes)
  await userEventSession.click(buttonLikes)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
