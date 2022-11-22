const User = require("../models/users");
const { generateHashedPassword } = require("../utils/helper");
const jwt = require("jsonwebtoken");

const addUserController = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const { file } = req;

  const hashedPassword = generateHashedPassword({ password });

  try {
    const user = new User({
      name,
      username,
      email,
      image: `${process.env.HOST}${file.path}`,
      password: hashedPassword,
      posts: [],
    });

    await user.save();

    return res.status(201).json({
      message: "User Creation Successful.",
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = generateHashedPassword({ password });

  try {
    const user = await User.findOne({ email, password: hashedPassword });

    if (!user) {
      throw new Error("User Not Found.");
    } else {
      const authToken = jwt.sign(
        { userId: user?._id },
        process.env.PASSWORD_SECRET,
        { expiresIn: "1h" }
      );

      const generateExpiryInMilSeconds = ({ hours = 1 }) => {
        const currentDate = new Date();

        currentDate.setHours(currentDate.getHours() + hours);

        return currentDate.getTime();
      };

      return res.status(200).json({
        userId: user?._id,
        authenticated: true,
        authToken,
        expiry: generateExpiryInMilSeconds({ hours: 1 }),
      });
    }
  } catch (error) {
    next(error);

    return error;
  }
};

const userStatusController = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const authToken = authorization.split(" ")[1];

      const decodedToken = jwt.verify(authToken, process.env.SECRET);

      if (!decodedToken) {
        throw new Error("Not a valid token.");
      }

      const { userId } = decodedToken;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not Found.");
      }

      res.json({
        status: "Authorized",
      });

      return null;
    } else {
      throw new Error("Authorization Header not Found");
    }
  } catch (error) {
    next(error);
    return error;
  }
};

module.exports = {
  addUserController,
  loginUserController,
  userStatusController,
};
