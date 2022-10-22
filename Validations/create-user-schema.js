const { body } = require("express-validator");
const User = require("../models/users");

const create_user_schema = [
  body("name")
    .trim()
    .isLength({
      max: 30,
      min: 4,
    })
    .withMessage("Name must be between 4 to 30 characters."),
  body("username")
    .trim()
    .isLength({ max: 15, min: 5 })
    .withMessage("Username must be between 5 to 15 characters.")
    .custom((value, { req }) => {
      const { email } = req.body;

      const username = value;

      return User.findOne({ username, email }).then((user) => {
        if (user) {
          return Promise.reject("User name and Email already exist.");
        }
      });
    }),
  body("email").trim().isEmail().withMessage("Enter a valid email."),
  body("password")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Password must be between 5 to 15 characters"),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      const { password } = req.body;

      const confirm_password = value;

      if (password === confirm_password) {
        return true;
      } else {
        throw new Error("Confirm password not matched.");
      }
    }),
];

module.exports = create_user_schema;
