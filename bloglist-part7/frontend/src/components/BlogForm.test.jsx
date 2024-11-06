// for testing the frontend of the blog application

//dependecies
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('createBlog gets correct values', async () => {

  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const saveButton = screen.getByText('Create')

  await userEvent.type(inputTitle, 'Testi Blogi')
  await userEvent.type(inputAuthor, 'Matti Möttönen')
  await userEvent.type(inputUrl, 'https://www.testihöpöhöpöä.com')
  await userEvent.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Blogi')
  expect(createBlog.mock.calls[0][0].author).toBe('Matti Möttönen')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.testihöpöhöpöä.com')

})
