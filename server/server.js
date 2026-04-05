import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes        from './src/routes/authRoutes.js';
import studentRoutes     from './src/routes/studentRoutes.js';
import teacherRoutes     from './src/routes/teacherRoutes.js';
import superAdminRoutes  from './src/routes/superAdminRoutes.js';
import institutionRoutes from './src/routes/institutionRoutes.js';
import attendanceRoutes  from './src/routes/attendanceRoutes.js';
import feeRoutes         from './src/routes/feeRoutes.js';
import materialRoutes    from './src/routes/materialRoutes.js';
import assignmentRoutes  from './src/routes/assignmentRoutes.js';
import timetableRoutes   from './src/routes/timetableRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ── Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Static file serving — uploaded materials & submissions
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes
app.use('/api/auth',         authRoutes);
app.use('/api/students',     studentRoutes);
app.use('/api/teachers',     teacherRoutes);
app.use('/api/super-admin',  superAdminRoutes);
app.use('/api/institution',  institutionRoutes);
app.use('/api/attendance',   attendanceRoutes);
app.use('/api/fees',         feeRoutes);
app.use('/api/materials',    materialRoutes);
app.use('/api/assignments',  assignmentRoutes);
app.use('/api/timetable',    timetableRoutes);

// ── Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Global error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Server error.' });
});

// ── DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));