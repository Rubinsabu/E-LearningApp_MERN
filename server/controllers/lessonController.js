import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

export const getLessonsForCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  res.json(course.lessons);
};

export const getWatchedLessons = async (req, res) => {
  const enrollment = await Enrollment.findOne({
    student: req.user.id,
    course: req.params.courseId
  });

  if (!enrollment) return res.status(404).json({ message: 'Not enrolled' });
  res.json(enrollment.watchedLessons || []);
};

export const markLessonWatched = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const enrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });

  if (!enrollment) return res.status(404).json({ message: 'Not enrolled' });

  const alreadyWatched = enrollment.watchedLessons.includes(lessonId);

  if (!alreadyWatched) {
    enrollment.watchedLessons.push(lessonId);
  } else {
    enrollment.watchedLessons = enrollment.watchedLessons.filter(id => id.toString() !== lessonId);
  }

  await enrollment.save();
  res.json({ watchedLessons: enrollment.watchedLessons });
};
