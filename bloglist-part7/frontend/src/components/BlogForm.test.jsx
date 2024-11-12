import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import BlogForm from '../components/BlogForm'
import { createTestStore } from '../testUtils/testStore'
import { vi } from 'vitest'

// Fake axios return without any data in it
vi.mock('axios', () => ({
  post: vi.fn().mockResolvedValue({
    data: {},
  }),
  get: vi.fn().mockResolvedValue({ data: [] }),
}))

const initialState = {
  blogs: [],
  user: { user: { id: '1', username: 'akortelai', name: 'Antti Kortelainen' } },
}

const mockStore = createTestStore(initialState)

//test that addBlog functions object blog gets inputed data correctly
test('BlogForm creates blog with correct values', async () => {
  const addBlog = (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    expect(blog).toEqual({
      title: 'Testi Blogi',
      author: 'Matti Möttönen',
      url: 'http://testihöpöhöpö.com',
    })
  }

  render(
    <Provider store={mockStore}>
      <BlogForm addBlog={addBlog} />
    </Provider>
  )

  const titleInput = screen.getByTestId('title')
  const authorInput = screen.getByTestId('author')
  const urlInput = screen.getByTestId('url')
  const submitButton = screen.getByRole('button', { name: /create/i })

  await userEvent.type(titleInput, 'Testi Blogi')
  await userEvent.type(authorInput, 'Matti Möttönen')
  await userEvent.type(urlInput, 'http://testihöpöhöpö.com')

  await userEvent.click(submitButton)
})
