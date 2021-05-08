const express = require('express')
const router = express.Router()
const Comment = require('../Models/Comments')

router.get('/', function(req, res, next) {
  Comment.find()
    .exec()
    .then(comments => {
      console.log(comments)
      if (comments.length >= 0) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({
          message: 'No Comments found'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  const comment = new Comment(req.body)
  comment
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Comment Created',
        createdComment: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
module.exports = router
