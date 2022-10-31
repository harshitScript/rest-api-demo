const express = require("express");
const { config } = require("dotenv");
const io = require("socket.io");
const feedRoutes = require("./routes/feedRoutes");
const notFoundController = require("./controllers/notFoundController");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const cors = require("./middleware/cors");
const path = require("path");
const rootDir = require("./utils/rootDir");
const connectMongo = require("./database/mongodb-mongoose");
const headers = require("./middleware/headers");
const userRoutes = require("./routes/userRoutes");
const { connectSocket } = require("./socket");

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

app.use("/user", userRoutes);

app.use(notFoundController);

app.use(errorHandlingMiddleware);

connectMongo()
  .then(() => {
    //* HTTP/HTTPS server [request <> response] architecture.
    const httpServer = app.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log(
          `Error occurred while starting the server at port ${process.env.PORT}`
        );
      }

      return console.log(`Server started at post ${process.env.PORT}.`);
    });

    //* web-socket protocol [push data : server > client]
    const socket = connectSocket(httpServer);

    socket.on("connection", (client_socket) => {
      console.log("New client connection added.");

      client_socket.on("disconnect", () => {
        console.log("Client disconnected.");
      });
    });
  })
  .catch((error) => {
    console.log("Error occurred while connecting the database.");
  });
