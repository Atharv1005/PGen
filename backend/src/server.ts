import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/users";

import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/users", userRoutes);


// Create HTTP server
const server = http.createServer(app);


// Setup Socket.io
const io = new Server(server, {

  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }

});


io.on("connection", (socket) => {

  console.log("User connected:", socket.id);


  socket.on("join_chat", (chatId: string) => {

    socket.join(chatId);

  });


  socket.on("send_message", (data) => {

    io.to(data.chatId).emit("receive_message", data);

  });

  socket.on("typing", (chatId: string) => {
    socket.to(chatId).emit("user_typing");
  });

  socket.on("stop_typing", (chatId: string) => {
    socket.to(chatId).emit("stop_typing");
  });

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

  });

});

app.get("/", (req, res) => {
  res.send("PGen backend running");
});

server.listen(5000, () => {

  console.log("Server running on port 5000");

});