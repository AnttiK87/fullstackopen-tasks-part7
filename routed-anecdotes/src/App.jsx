import { useState } from 'react'
import { useField }from './hooks'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
} from 'react-router-dom'
import PropTypes from 'prop-types'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual
       person or an incident. Occasionally humorous, anecdotes differ
       from jokes because their primary purpose is  not simply to
       provoke laughter but to reveal a truth more general than the
       brief tale itself, such as to characterize a person by delineating
       a specific quirk or trait, to communicate an abstract idea about
       a person, place, or thing through the concrete details of a
       short narrative. An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes,
       at this app you can find the best and add more.</p>
  </div>
)

const Anecdote = ({ anecdote, vote }) => {
  const id = anecdote.id
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes! <button type="button" onClick={() => vote(id)}>Vote</button></div>
      <div>for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
  vote: PropTypes.func.isRequired,
}

const Footer = () => {
  const padding = {
    paddingTop: 5
  }
  return (
    <h4 style={padding} >
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>. See
      <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/main/src/App.jsx'>
        https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.jsx
      </a> for the source code.
    </h4>
  )
}

const Notification = ({ notification }) => {
  const padding = {
    paddingTop: 5
  }

  if(notification === null){
    return
  }

  return (
    <h4 style={padding} >
      {notification}
    </h4>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
}

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info }= useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  // Funktio kaikkien kenttien tyhjentämiseen
  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url for more info:
          <input {...info} />
        </div>
        <button >create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
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
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    const message = `a new anecdote ${anecdote.content} created`
    showNotification(message)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const showNotification = (notification) => {
    setNotification(notification)

    const displayTime = 5000

    setTimeout(() => {
      setNotification(null)
    }, displayTime)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route
          path="anecdote/:id"
          element={<Anecdote anecdote={anecdote} vote={vote} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  )
}

// Määritellään propTypes CreateNew-komponentille
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired, // Varmistaa, että addNew on funktio ja pakollinen
}

export default App
