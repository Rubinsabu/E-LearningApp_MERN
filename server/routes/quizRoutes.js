import express from 'express';
import {
  createQuiz,
  getQuizByCourse,
  submitQuiz
} from '../controllers/quizController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:courseId', verifyToken, getQuizByCourse); // students + instructor
router.post('/:courseId', verifyToken, requireRole(['instructor']), createQuiz); // instructor only
router.post('/submit/:courseId', verifyToken, requireRole(['student']), submitQuiz); // student only

export default router;