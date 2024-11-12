import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'
import { Provider } from 'react-redux'
import { createTestStore } from '../testUtils/testStore'
import { MemoryRouter } from 'react-router-dom'

// test for bloglist. Only blos author and title are show here
test('renders blog list content correctly', async () => {
  const blog = {
    id: '898c',
    title: 'Testi Blogi 1',
    author: 'Matti Möttönen',
    url: 'https://www.testihöpöhöpöä1.fi/',
    likes: 42,
    user: { username: 'akortelai', name: 'Antti Kortelainen', id: '1' },
  }

  const initialState = {
    blogs: [blog],
    user: { user: { id: '1', username: 'akortelai', name: 'Antti Kortelainen' } },
  }

  const store = createTestStore(initialState)

  const blogFormRef = React.createRef()

  render(
    <Provider store={store}>
      <MemoryRouter>
        <BlogList blogFormRef={blogFormRef} />
      </MemoryRouter>
    </Provider>
  )

  const title = screen.getByText(/Testi Blogi 1/i)
  const author = screen.getByText(/Matti Möttönen/i)

  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText(/Link to the blog: https:\/\/www.testihöpöhöpö.com/i)
  const likes = screen.queryByText(/Likes: 42/i)

  expect(url).toBeNull()
  expect(likes).toBeNull()
})
