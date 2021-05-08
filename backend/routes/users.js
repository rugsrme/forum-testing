const express = require('express')
const router = express.Router()
//const mongoose = require('mongoose')
const User = require('../Models/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
    .exec()
    .then(users => {
      console.log(users)
      if (users.length >= 0) {
        res.status(200).json(users)
      } else {
        res.status(404).json({
          message: 'No Users found'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.route('/').post((req, res, next) => {
  const user = new User(req.body)
  user.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'User Created',
      createdUser: result
    })
  })
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .exec()
    .then(user => {
      console.log('from database', user)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'No user found with that id' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId
  const updateOptions = {}
  for (const ops of req.body) {
    updateOptions[ops.propName] = ops.value
  }
  User.update({ _id: id }, { $set: updateOptions })
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

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.deleteOne({ _id: id })
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
