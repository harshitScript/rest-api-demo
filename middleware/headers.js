const headers = (req, res, next) => {
  res.setHeader("phase", process.env.APP_PHASE);

  next();
};

module.exports = headers;
