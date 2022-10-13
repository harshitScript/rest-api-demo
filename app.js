const express = require("express");
const { config } = require("dotenv");
const feedRoutes = require("./routes/feed");
const notFoundController = require("./controllers/notFoundController");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const cors = require("./middleware/cors");
const path = require("path");
const rootDir = require("./utils/rootDir");
const connectMongo = require("./database/mongodb-mongoose");
const headers = require("./middleware/headers");

const app = express();
config();

//* CORS HEADERS
app.use(cors);

//* GENERAL HEADERS
app.use(headers);

//* STATIC-ENDPOINTS GET /images/file_name.format
app.use("/images", express.static(path.join(rootDir, "images")));

//* ENDPOINTS  <METHOD | PATH>
app.use("/feed", feedRoutes);

app.use(notFoundController);

app.use(errorHandlingMiddleware);

connectMongo()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log(
          `Error occurred while starting the server at port ${process.env.PORT}`
        );
      }

      return console.log(`Server started at post ${process.env.PORT}.`);
    });
  })
  .catch(() => {
    console.log("Error occurred while connecting the database.");
  });
