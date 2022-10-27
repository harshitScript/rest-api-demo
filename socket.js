const io = require("socket.io");

let socket;

const connectSocket = (httpServer) => {
  socket = io(httpServer);

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
