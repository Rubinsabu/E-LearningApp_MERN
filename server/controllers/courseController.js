import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// Instructor side
export const createCourse = async (req, res) => {
    try {
      const { title, description, category, thumbnail, lessons } = req.body;
      const course = new Course({
        instructor: req.user.id,
        title,
        description,
        category,
        thumbnail,
        lessons
      });
      const saved = await course.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ msg: 'Error creating course' });
    }
  };


  export const updateCourse = async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.id, instructor: req.user.id });
      if (!course) return res.status(404).json({ msg: 'Course not found' });
  
      Object.assign(course, req.body);
      const updated = await course.save();
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ msg: 'Error updating course' });
    }
  };

  export const deleteCourse = async (req, res) => {
    try {
      const deleted = await Course.findOneAndDelete({ _id: req.params.id, instructor: req.user.id });
      if (!deleted) return res.status(404).json({ msg: 'Course not found' });
      res.status(200).json({ msg: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Error deleting course' });
    }
  };

  export const getInstructorCourses = async (req, res) => {
    try {
      const courses = await Course.find({ instructor: req.user.id });
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching courses' });
    }
  };

// Student - Course Controller

// Get all published and approved courses
export const getAllPublishedCourses = async (req, res) => {
  try {
    const {search, category} = req.query;
    const filter = {
      isPublished: true,
      isApproved: true,
    }
    if(search){
      filter.title = { $regex: search, $options: 'i' };
    }
    if(category){
      filter.category = { $regex: category, $options: 'i' };
    }
    const courses = await Course.find(filter);

    res.json(courses);
  } catch (error) {
    console.error('Error fetching published courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get course details by ID
export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'instructor', 
      select: 'name -_id',  
    });
    if (!course || !course.isPublished || !course.isApproved) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if req.user exists
    let isEnrolled = false;
    if (req.user && req.user.id) {
      const enrollment = await Enrollment.findOne({
        student: req.user.id,
        course: course._id,
      });
      isEnrolled = !!enrollment; // !! converts the enrollment object (or null) to a boolean
    }

    // Prepare the response object
    const courseDetails = {
      ...course.toObject(), // Convert mongoose document to a plain JavaScript object
      isEnrolled: isEnrolled,
    };

    res.json(courseDetails);

  } catch (error) {
    console.error("Error in getCourseDetails:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user.id;
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    const enrollment = new Enrollment({ 
      student: studentId, 
      course: courseId 
     });
    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEnrolledCourses = async(req,res)=>{
  try{

    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId }).populate({
      path: 'course',
      select: 'title category thumbnail lessons',
    });

    // Transform enrollments to include progress
    const enrolledCourses = enrollments.map((enrollment) => {
      const course = enrollment.course;
      const totalLessons = course.lessons.length;
      const watchedLessons = enrollment.watchedLessons.length;
      const progressPercentage = totalLessons > 0 
        ? Math.round((watchedLessons / totalLessons) * 100) 
        : 0;

      return {
        ...course.toObject(), // Convert Mongoose document to plain object
        progressPercentage,
        enrollmentId: enrollment._id 
      };
    });
    res.status(200).json(enrolledCourses);

  }catch(error){
    console.error('Error fetching enrolled courses',error);
    res.status(500).json({ message: 'Server error' });
  }
}
