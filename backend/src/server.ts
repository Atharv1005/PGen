import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("PGen backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});