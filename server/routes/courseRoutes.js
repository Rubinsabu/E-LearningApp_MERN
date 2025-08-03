import express from 'express';
import { createCourse, updateCourse, deleteCourse, getInstructorCourses } from '../controllers/courseController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import { getAllPublishedCourses, getCourseDetails,enrollInCourse, getEnrolledCourses } from '../controllers/courseController.js';

const router = express.Router();

router.use(verifyToken);

// Instructor
router.post('/courses', requireRole(['instructor']), createCourse);
router.put('/courses/:id', requireRole(['instructor']), updateCourse);
router.delete('/courses/:id', requireRole(['instructor']), deleteCourse);
router.get('/courses/my-courses', requireRole(['instructor']), getInstructorCourses);

//student - course
router.get('/courses', getAllPublishedCourses);
router.get('/courses/:id', getCourseDetails);
router.post('/enroll/:courseId', requireRole(['student']),enrollInCourse);
router.get('/enrolled-courses', getEnrolledCourses);


export default router;