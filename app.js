const express = require("express");
const { config } = require("dotenv");
const feedRoutes = require("./routes/feed");
const notFoundController = require("./controllers/notFoundController");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");

const app = express();
config();

app.use("/feed", feedRoutes);

app.use(notFoundController);

app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, (err) => {
  if (err)
    return console.log(
      `Error occurred while starting the server at port ${process.env.PORT}`
    );

  return console.log(`Server started at post ${process.env.PORT}.`);
});