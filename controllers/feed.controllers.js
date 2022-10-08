const getPostsController = (req, res, next) => {
  return res.json([
    {
      title: 'I m super hero',
      description: 'One day i will be super hero of my own world.',
      image: 'http://localhost:4000/images/test.jpg'
    }
  ])
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
