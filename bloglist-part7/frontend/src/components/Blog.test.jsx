// for testing the frontend of the blog application

//dependecies
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Testi Blogi',
    author: 'Matti Möttönen',
    url: 'https://www.testihöpöhöpöä.com',
    likes: 12,
    user: {
      id: '1',
      name: 'Antti Kortelainen'
    }
  }

  const user = {
    id: '1',
  }

  test('renders blog title and author by default', () => {
    render(<Blog blog={blog} user={user} />)

    // Check that title and author are displayed
    expect(screen.getAllByText(/Title:/).length).toBe(1)
    expect(screen.getAllByText(/Testi Blogi/).length).toBe(1)
    expect(screen.getAllByText(/Author:/).length).toBe(1)
    expect(screen.getAllByText(/Matti Möttönen/).length).toBe(1)

    // Check that details are not visible initially
    expect(screen.queryByText(/Link to blog:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/https:\/\/www\.testihöpöhöpöä\.com/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/12/)).not.toBeInTheDocument()
  })

  test('toggles visibility when "View" and "Hide" buttons are clicked', async () => {
    render(<Blog blog={blog} user={user} />)

    expect(screen.queryByText(/Link to blog:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/https:\/\/www\.testihöpöhöpöä\.com/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/12/)).not.toBeInTheDocument()

    // click of the "View" button
    const eventUser = userEvent.setup()
    const buttonView = screen.getByText('View')
    await eventUser.click(buttonView)

    //checkt that info is visible
    expect(screen.getByText(/Link to blog:/)).toBeInTheDocument()
    expect(screen.queryByText(/https:\/\/www\.testihöpöhöpöä\.com/)).toBeInTheDocument()
    expect(screen.queryByText(/Likes:/)).toBeInTheDocument()
    expect(screen.queryByText(/12/)).toBeInTheDocument()

    // click of the "Hide" button
    const buttonHide = screen.getByText('Hide')
    await eventUser.click(buttonHide)

    // check that info is hidden
    expect(screen.queryByText(/Link to blog:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/https:\/\/www\.testihöpöhöpöä\.com/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/12/)).not.toBeInTheDocument()
  })

  test('check that addLike function is called twice', async () => {

    const addLike =  vi.fn()

    render(<Blog blog={blog} user={user} addLike={addLike} />)

    const eventUser = userEvent.setup()
    const buttonView = screen.getByText('View')
    await eventUser.click(buttonView)

    const buttonLike = screen.getByText('Like')
    await eventUser.click(buttonLike)
    await eventUser.click(buttonLike)

    expect(addLike.mock.calls).toHaveLength(2)
  })

})
