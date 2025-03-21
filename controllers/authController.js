import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import sendMail from "../services/mailService.js";

configDotenv();

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // If user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists!" });

    // Create User
    user = new User({ fullName, email, password });
    await user.save();
    console.log("User saved to database");

    await sendMail(
      email,
      "Welcome to Our App!",
      `Hello ${fullName}, welcome to our app!`,
      `<h2>Hello ${fullName},</h2><p>We're glad to have you here.</p>`
    );

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Create tokens
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    // Send response
    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
