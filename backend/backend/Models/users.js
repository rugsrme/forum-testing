const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    status: {
      type: Number,
      required: true,
      default: 1
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)
