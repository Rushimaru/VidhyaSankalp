import express from 'express';
import { getTimetable, getTeacherTimetable, saveTimetable, deleteTimetable } from '../controllers/timetableController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTimetable);
router.get('/teacher/:userId', protect, getTeacherTimetable);
router.post('/', protect, requireRole('admin', 'superadmin'), saveTimetable);
router.delete('/:id', protect, requireRole('admin', 'superadmin'), deleteTimetable);

export default router;
