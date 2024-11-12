import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, vi } from 'vitest'
import { Provider } from 'react-redux'
import { createTestStore } from '../testUtils/testStore'
import { MemoryRouter } from 'react-router-dom'

// Fake axios return without any data in it
vi.mock('axios', () => ({
  post: vi.fn().mockResolvedValue({
    data: {},
  }),
  get: vi.fn().mockResolvedValue({ data: [] }),
}))

describe('Blog component', () => {
  const blog = {
    _id: '670e101eeeb3da59ff1b898c',
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

  //test that blogs info in rendered correctly
  test('renders blog content correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </Provider>
    )

    const title = screen.getByText(/Testi Blogi 1/i)
    const author = screen.getByText(/Matti Möttönen/i)
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const url = screen.queryByText(/https:\/\/www.testihöpöhöpöä1.fi/i)
    const likes = screen.getByText(/Likes:/i)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  //Test that mocked function/dispatch is called twice when like button is pressed twice
  test('calls like function twice when like button is clicked twice', async () => {
    const dispatch = vi.spyOn(store, 'dispatch')

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </Provider>
    )

    const eventUser = userEvent.setup()
    const likeButton = screen.getByRole('button', { name: /like/i })

    dispatch.mockClear()

    await eventUser.click(likeButton)
    await eventUser.click(likeButton)

    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})
