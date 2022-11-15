import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
