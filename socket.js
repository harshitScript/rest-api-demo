const io = require("socket.io");

let socket;

const handlePreflightRequest = (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
  });

  return res.end();
};

const connectSocket = (httpServer) => {
  socket = io(httpServer, {
    cors: {
      origins: ["*"],
      handlePreflightRequest,
    },
  });

  return socket;
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Error occurred while connecting the web socket.");
  }
  return socket;
};

module.exports = {
  connectSocket,
  getSocket,
};
