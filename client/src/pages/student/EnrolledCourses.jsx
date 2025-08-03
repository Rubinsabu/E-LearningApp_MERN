import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import ThumbnailImage from '../../components/ThumbnailImage';
import {Link} from 'react-router-dom';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await axios.get('/student/enrolled-courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnrolled();
  }, []);


  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Enrolled Courses
        </h2>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 font-medium">
              You have not enrolled in any courses yet.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <ThumbnailImage
                  url={course.thumbnail}
                  alt={course.title}
                  placeholderText="Course Image"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{course.category}</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progressPercentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-700 h-2 rounded-full" 
                        style={{ width: `${course.progressPercentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;