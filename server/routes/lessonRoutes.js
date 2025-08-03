import express from 'express';
import {getLessonsForCourse, markLessonWatched, getWatchedLessons} from '../controllers/lessonController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:courseId', verifyToken, getLessonsForCourse);
router.post('/:courseId/lesson/:lessonId/watch', verifyToken, markLessonWatched);
router.get('/:courseId/watched', verifyToken, getWatchedLessons);

export default router;