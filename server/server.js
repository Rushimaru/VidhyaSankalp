import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes    from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import teacherRoutes from './src/routes/teacherRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth',     authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// DB + Server 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error', err));