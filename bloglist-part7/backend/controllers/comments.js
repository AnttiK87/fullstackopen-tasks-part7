// API routes for comments related requests

// Dependencies
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog') // Lisää Blog-malli

// Get all comments
commentsRouter.get('/', async (request, response) => {
  try {
    const comments = await Comment.find({}).populate('blog', {
      id: 1,
      title: 1, // Varmista, että myös blogin title saadaan
    })
    response.json(comments)
  } catch (error) {
    response.status(500).json({ error: `Something went wrong ${error}` })
  }
})

// Add Comment
commentsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const blogId = request.body.blog

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    // Luo uusi kommentti
    const newComment = new Comment({
      comment: body.comment,
      blog: blog._id,
    })

    // Tallenna kommentti
    const savedComment = await newComment.save()

    if (!Array.isArray(blog.comments)) {
      blog.comments = [] // Alustetaan taulukko, jos se ei ole vielä määritelty
    }

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    // Populoi blogin tiedot tallenetun kommentin jälkeen
    const populatedComment = await Comment.findById(savedComment._id).populate(
      'blog',
      { id: 1, title: 1 },
    )

    response.status(201).json(populatedComment)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = commentsRouter
