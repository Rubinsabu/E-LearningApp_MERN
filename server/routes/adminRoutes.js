import express from 'express';
import {
  getCourses,
  approveCourse,
  rejectCourse,
  deleteCourse,
  getAllUsers,
  banUser,
  unbanUser,
  getPlatformStats
} from '../controllers/adminControllers.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken, requireRole(['admin']));

router.get('/courses/pending', getCourses);
router.patch('/course/approve/:id', approveCourse);
router.patch('/course/reject/:id', rejectCourse);
router.put('/course/delete/:id', deleteCourse);
router.get('/users', getAllUsers);
router.patch('/user/ban/:id', banUser);
router.patch('/user/unban/:id', unbanUser);
router.get('/stats', getPlatformStats);

export default router;
