import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, username, phone, password } = req.body || {};

    // Validate required fields
    if (!name || !email || !username || !password) {
      return res.status(400).json({
        message: "Name, email, username, and password are required"
      });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
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
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


/**
 * @route   POST /api/auth/login
 * @desc    Login user using username OR email
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body || {};

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Username/email and password are required"
      });
    }

    // Find user by email OR username
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress || null
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

/**
 * @route POST /api/auth/connect-wallet
 */
router.post("/connect-wallet", async (req: Request, res: Response) => {

  try {

    const { userId, walletAddress } = req.body;

    const user = await User.findByIdAndUpdate(

      userId,

      { walletAddress },

      { new: true }

    );

    res.json({
      message: "Wallet connected",
      walletAddress: user?.walletAddress
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

export default router;