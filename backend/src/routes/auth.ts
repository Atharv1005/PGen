import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {

  try {

    const { name, email, username, phone, password } = req.body || {};

    // check if email exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // check if username exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      username,
      phone,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

export default router;