import express from 'express';
import {
  addStudent, getStudents, getStudentById,
  updateStudent, deleteStudent, bulkUploadStudents, getStudentStats,
} from '../controllers/studentController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';
import upload, { setUploadDir } from '../middleware/upload.js';
import multer from 'multer';

// Memory storage for Excel (don't save to disk)
const memUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = express.Router();

router.get('/stats', protect, getStudentStats);
router.get('/', protect, getStudents);
router.get('/:id', protect, getStudentById);
router.post('/', protect, requireRole('admin', 'superadmin'), addStudent);
router.post('/bulk-upload', protect, requireRole('admin', 'superadmin'), memUpload.single('file'), bulkUploadStudents);
router.put('/:id', protect, requireRole('admin', 'superadmin'), updateStudent);
router.delete('/:id', protect, requireRole('admin', 'superadmin'), deleteStudent);

export default router;