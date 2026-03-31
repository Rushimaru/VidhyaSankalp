import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes    from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());   // ← reads cookies from every request

// Routes
app.use("/api/auth",     authRoutes);
app.use("/api/students", studentRoutes);

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}...`)
    );
  })
  .catch((err) => console.error("MongoDB connection error...", err));