import Course from "../models/Course.js";
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';

export const getCourses = async (req, res) => {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
  };

export const approveCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
  
    course.isApproved = true;
    course.isPublished = true;

    await course.save();
    res.json({ message: 'Course approved' });
  };

export const deleteCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
  
    await course.deleteOne();
    res.json({ message: 'Course rejected' });
  };

export const rejectCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
  
    course.isApproved = false;
    course.isPublished = true;

    await course.save();

    res.json({ message: 'Course rejected & deleted' });
  };

export const getAllUsers = async (req, res) => {
    const users = await User.find({}, 'name email role isBanned');
    res.json(users);
  };

export const banUser = async (req, res) => {
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    user.isBanned = true;
    await user.save();
    res.json({ message: 'User banned' });
 };

export const unbanUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    user.isBanned = false;
    await user.save();
    res.json({ message: 'User unbanned' });
  };

  
export const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const approvedCourses = await Course.countDocuments({ isApproved: true });

    
    const popularCoursesData = await Enrollment.aggregate([
      {
        $group: {
          _id: '$course',
          enrollmentsCount: { $sum: 1 }
        }
      },
      {
        $sort: { enrollmentsCount: -1 } // Sort by most enrolled
      },
      {
        $limit: 5 // Get top 5 most popular courses
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      {
        $unwind: '$courseDetails'
      },
      {
        $project: {
          _id: 0,
          courseId: '$courseDetails._id',
          title: '$courseDetails.title',
          enrollmentsCount: 1
        }
      }
    ]);

    res.json({
      totalUsers,
      totalCourses,
      approvedCourses,
      popularCourses: popularCoursesData 
    });
  } catch (error) {
    console.error('Error in getPlatformStats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  };





