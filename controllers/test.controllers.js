//? ALL CONTROLLERS FUNCTIONS HERE ARE PURELY FOR TESTING PURPOSE

const User = require("../models/users");

const testController1 = (req, res) => {
  const { test_id } = req.params;
  if (test_id) {
    res.json({
      test_id,
    });

    return;
  } else {
    throw new Error("Test id not found.");
  }
};

const testController2 = async (req, res, next) => {
  const { id } = req.query;

  try {
    const user = await User.findOne(id);

    if (user) {
      res.json({
        user_id: id,
      });
      return;
    }
    throw new Error("User not found.");
  } catch (error) {
    next(error);
    return error;
  }
};

module.exports = {
  testController1,
  testController2,
};
