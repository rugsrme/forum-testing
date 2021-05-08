const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
  title: {
    minlength: 3,
    required: true,
    trim: true,
    type: String
  },
  content: {
    minlength: 3,
    required: true,
    trim: true,
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})
module.exports = mongoose.model('Post', postSchema)
