import express from "express";
import User from "../models/User";

const router = express.Router();

// Search users
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query as string;

    if (!query) {
      return res.json([]);
    }

    const users = await User.find({
      username: { $regex: query, $options: "i" }
    }).select("_id username walletAddress");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;