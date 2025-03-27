import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON request bodies

app.use("/api/auth", authRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message });
});

export default app;
