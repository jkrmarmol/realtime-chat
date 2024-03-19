import { config } from "dotenv";
import path from "path";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

config({ path: path.resolve(process.cwd(), ".env") });
const app = express();
const PORT = 8972;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI,
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
