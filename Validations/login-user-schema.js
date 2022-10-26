const { body } = require('express-validator')

const loginUserSchema = [
  body('email').trim().isEmail().withMessage('Enter a valid email.'),
  body('password')
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage('Password must be between 5 to 15 characters')
]

module.exports = loginUserSchema
