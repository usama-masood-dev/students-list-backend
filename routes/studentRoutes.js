import express from "express";
import {
  addStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", verifyToken, addStudent);

router.put("/:id", verifyToken, updateStudent);

router.delete("/:id", verifyToken, deleteStudent);

export default router;
