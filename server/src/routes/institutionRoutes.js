import express from 'express';
import {
  listAcademicYears, createAcademicYear, updateAcademicYear, deleteAcademicYear,
  listClasses, createClass, updateClass, deleteClass,
  listSubjects, createSubject, updateSubject, deleteSubject,
  listFaculty, createFaculty, updateFaculty, toggleFacultyStatus,
} from '../controllers/institutionController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const isAdmin = [protect, requireRole('superadmin', 'admin')];

// Academic Years
router.get('/academic-years', ...isAdmin, listAcademicYears);
router.post('/academic-years', ...isAdmin, createAcademicYear);
router.put('/academic-years/:id', ...isAdmin, updateAcademicYear);
router.delete('/academic-years/:id', ...isAdmin, deleteAcademicYear);

// Classes
router.get('/classes', protect, listClasses);
router.post('/classes', ...isAdmin, createClass);
router.put('/classes/:id', ...isAdmin, updateClass);
router.delete('/classes/:id', ...isAdmin, deleteClass);

// Subjects
router.get('/subjects', protect, listSubjects);
router.post('/subjects', ...isAdmin, createSubject);
router.put('/subjects/:id', ...isAdmin, updateSubject);
router.delete('/subjects/:id', ...isAdmin, deleteSubject);

// Faculty management (admin only)
router.get('/faculty', ...isAdmin, listFaculty);
router.post('/faculty', ...isAdmin, createFaculty);
router.put('/faculty/:id', ...isAdmin, updateFaculty);
router.patch('/faculty/:id/toggle', ...isAdmin, toggleFacultyStatus);

export default router;
