const express = require('express')
const router = express.Router()
const Post = require('../Models/posts')

/* GET posts listing. */
router.get('/', function(req, res, next) {
  Post.find()
    .exec()
    .then(posts => {
      const response = {
        count: posts.length,
        posts: posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            _id: post._id,
            author: post.author,
            postImage: post.postImage,
            request: {
              type: 'GET',
              url: post._id
            }
          }
        })
      }
      res.json(response)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  const post = new Post(req.body)
  post
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Post Created',
        createdPost: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.get('/:postId', (req, res, next) => {
  Post.findById(req.params.postId)
    .exec()
    .then(post => {
      console.log('from database', post)
      if (post) {
        res.status(200).json({
          post: post,
          request: {
            type: 'GET',
            url: post._id
          }
        })
      } else {
        res.status(404).json({ message: 'No post found with that id' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
router.patch('/:postId', (req, res, next) => {
  const id = req.params.postId
  const updateOptions = {}
  for (const ops of req.body) {
    updateOptions[ops.propName] = ops.value
  }
  Post.update({ _id: id }, { $set: updateOptions })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:postId', (req, res, next) => {
  const id = req.params.postId
  Post.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
module.exports = router
