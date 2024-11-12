// Model for comments that are added to the db

// Dependencies
const mongoose = require('mongoose')

// "Blueprint" for comment in the db and settings for validation
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 3,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

// Editing how comment data is returned as JSON
commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Creating the Comment model using the schema
module.exports = mongoose.model('Comment', commentSchema)
