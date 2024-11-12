// API routes for comments related requests

// Dependencies
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

// Get all comments
commentsRouter.get('/', async (request, response) => {
  try {
    const comments = await Comment.find({}).populate('blog', {
      id: 1,
      title: 1,
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

    const newComment = new Comment({
      comment: body.comment,
      blog: blog._id,
    })

    const savedComment = await newComment.save()

    if (!Array.isArray(blog.comments)) {
      blog.comments = []
    }

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

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
