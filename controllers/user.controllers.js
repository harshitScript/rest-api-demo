const User = require("../models/users");
const { generateHashedPassword } = require("../utils/helper");

const addUserController = (req, res, next) => {
  const { name, username, email, password } = req.body;

  const { file } = req;

  const hashedPassword = generateHashedPassword({ password });

  const successCallback = () => {
    return res.status(201).json({
      message: "User Creation Successful.",
    });
  };

  const failureCallback = (error) => {
    next(error);
  };

  const user = new User({
    name,
    username,
    email,
    image: `${process.env.HOST}${file.path}`,
    password: hashedPassword,
    password_alias: password,
  });

  user.save().then(successCallback).catch(failureCallback);
};

const loginUserController = (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = generateHashedPassword({ password });

  const failureCallback = (error) => next(error);

  const successCallback = (user) => {
    if (!user) {
      throw new Error("User Not Found.");
    } else {
      return res.status(200).json({
        userId: user?._id,
        authenticated: true,
      });
    }
  };

  User.findOne({ email, password: hashedPassword })
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = {
  addUserController,
  loginUserController,
};
