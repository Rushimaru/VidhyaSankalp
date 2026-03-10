const express = require('express');
const router  = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/student.controller');

router.post  ('/',    createStudent);    // POST   /api/students
router.get   ('/',    getAllStudents);    // GET    /api/students?page=1&limit=20&search=&classSelection=&section=
router.get   ('/:id', getStudentById);   // GET    /api/students/:id
router.put   ('/:id', updateStudent);    // PUT    /api/students/:id
router.delete('/:id', deleteStudent);    // DELETE /api/students/:id

module.exports = router;