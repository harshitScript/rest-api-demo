const { body } = require('express-validator')
const User = require('../models/users')

const createPostSchema = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 25 })
    .withMessage('Title must 10 to 25 characters long.'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must have 10 characters'),
  body('userId').custom((value) => {
    return User.findById(value).then((user) => {
      if (!user) {
        return Promise.reject('Unauthorized actions.')
      }
    })
  })
]

module.exports = createPostSchema
