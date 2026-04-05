import express from 'express';
import {
  listAssignments, getAssignment, createAssignment, updateAssignment,
  submitAssignment, gradeSubmission,
} from '../controllers/assignmentController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';
import upload, { setUploadDir } from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, listAssignments);
router.get('/:id', protect, getAssignment);
router.post('/', protect, requireRole('faculty', 'admin', 'superadmin'), createAssignment);
router.put('/:id', protect, requireRole('faculty', 'admin', 'superadmin'), updateAssignment);
router.post('/:id/submit',
  protect,
  setUploadDir('submissions'),
  upload.single('file'),
  submitAssignment
);
router.patch('/:id/grade/:studentId', protect, requireRole('faculty', 'admin', 'superadmin'), gradeSubmission);

export default router;
