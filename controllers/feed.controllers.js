const Post = require("../models/posts");

const getPostsController = (req, res, next) => {
  const failureCallback = (error) => {
    next(error);
  };

  const successCallback = (posts) => {
    return res.json(posts);
  };

  Post.find().then(successCallback).catch(failureCallback);
};

const postAddPostsController = (req, res, next) => {
  const { title, description, image } = req.body;

  const successCallback = () => {
    return res.status(201).json({
      message: "post created successfully",
      content: {
        title,
        description,
        image,
      },
    });
  };

  const failureCallback = (error) => {
    next(error);
  };

  // ? Some db operations
  const post = new Post({
    title,
    description,
    image: "http://localhost:4000/images/test.jpg",
    userId: {
      username: "hScript",
      userImage: "http://localhost:4000/images/user/test.jpg",
    },
  });
  post.save().then(successCallback).catch(failureCallback);
};

const getPostController = (req, res, next) => {
  const { _id } = req.params;

  const failureCallback = (error) => {
    next(error);
  };

  const successCallback = (post) => {
    if (post) {
      return res.json(post);
    }
    next(new Error("Post not Found."));
  };

  Post.findById(_id).then(successCallback).catch(failureCallback);
};

module.exports = {
  getPostsController,
  postAddPostsController,
  getPostController,
};
