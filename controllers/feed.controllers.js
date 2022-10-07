const getPostsController = (req, res, next) => {
  return res.json({ message: 'posts will be served.' })
}

const postAddPostsController = (req, res, next) => {
  const { title, description } = req.body

  // ? Some db operations

  return res.status(201).json({
    message: 'post created successfully',
    content: {
      title,
      description
    }
  })
}

module.exports = { getPostsController, postAddPostsController }
