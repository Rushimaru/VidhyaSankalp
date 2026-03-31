import express from "express";
import {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTeachers).post(protect, addTeacher);
router
  .route("/:id")
  .get(protect, getTeacherById)
  .put(protect, updateTeacher)
  .delete(protect, deleteTeacher);

export default router;
