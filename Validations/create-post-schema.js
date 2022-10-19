const { body } = require('express-validator')

const create_post_schema = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 25 })
    .withMessage('Title must 10 to 25 characters long.'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must have 10 characters')
]

module.exports = create_post_schema
