import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyCoursesQuery, useDeleteCourseMutation } from '../../features/instructor/instructorApi';
import ThumbnailImage from '../../components/ThumbnailImage';
import StudentsModal from './StudentsModal';

const InstructorCourses = () => {
  const { data: courses = [], isLoading } = useGetMyCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const navigate = useNavigate();
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleViewStudents = (courseId) => {
    setSelectedCourseId(courseId);
    setShowStudentsModal(true);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Courses</h1>
            <p className="text-gray-600 mt-2">Manage and organize your teaching materials</p>
          </div>
          <button 
            onClick={() => navigate('/instructor/create-course')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
          >
            + Create New Course
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg w-full"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-3 pt-4">
                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-3 text-lg font-medium text-gray-900">No courses yet</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first course</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/instructor/create-course')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
              >
                Create Course
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <ThumbnailImage
                  url={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                  <div className="flex justify-between space-x-3">
                    <button
                      onClick={() => navigate(`/instructor/create-quiz/${course._id}`)}
                      className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      Add Quiz
                    </button>
                    <button
                      onClick={() => handleViewStudents(course._id)}
                      className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                    >View Students</button>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <span className="inline-flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        )}
        {showStudentsModal && (
                <StudentsModal 
                  courseId={selectedCourseId} 
                  onClose={() => setShowStudentsModal(false)} 
                />
          )}
      </div>
    </div>
  );
};

export default InstructorCourses;
