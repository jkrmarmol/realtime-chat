import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = 8972;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    allowedHeaders: ["X-Requested-With", "content-type"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection!");
  socket.on("send_message", (data) => {
    socket.broadcast.except(socket.id).emit("server_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
