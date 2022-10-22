const { body } = require("express-validator");

const login_user_schema = [
  body("email")
    .trim()
    .normalizeEmail({ all_lowercase: true })
    .isEmail()
    .withMessage("Enter a valid email."),
  body("password")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Password must be between 5 to 15 characters"),
];

module.exports = login_user_schema;
