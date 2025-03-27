import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

function generateToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
}

const regex = /pattern/; // Correctly terminated

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, userType } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, userType });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    // Explicitly cast error to `any`
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
