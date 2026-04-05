import express from 'express';
import { markAttendance, getAttendance, getStudentAttendanceSummary } from '../controllers/attendanceController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mark', protect, requireRole('faculty', 'admin', 'superadmin'), markAttendance);
router.get('/', protect, getAttendance);
router.get('/summary/:studentId', protect, getStudentAttendanceSummary);

export default router;
