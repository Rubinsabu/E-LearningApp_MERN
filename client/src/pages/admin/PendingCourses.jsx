
import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import ThumbnailImage from '../../components/ThumbnailImage';

const PendingCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchPendingCourses = async () => {
    const res = await axios.get('/admin/courses/pending');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const handleAction = async (courseId, action) => {
    await axios.patch(`/admin/course/${action}/${courseId}`);
    fetchPendingCourses();
  };

  const getStatusInfo = (course) => {
    if (course.isApproved && course.isPublished) {
      return { status: 'Approved', color: 'text-green-600' };
    } else if (!course.isApproved && !course.isPublished) {
      return { status: 'Pending', color: 'text-yellow-600' };
    } else if (!course.isApproved && course.isPublished) {
      return { status: 'Rejected', color: 'text-red-600' };
    }
  };

  const renderButtons = (course) => {
    if (course.isApproved && course.isPublished) {
      // Approved: Only reject button
      return (
        <button
          onClick={() => handleAction(course._id, 'reject')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
        >
          Reject
        </button>
      );
    } else if (!course.isApproved && !course.isPublished) {
      // Pending: Both approve and reject buttons
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleAction(course._id, 'approve')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Approve
          </button>
          <button
            onClick={() => handleAction(course._id, 'reject')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
          >
            Reject
          </button>
        </div>
      );
    } else if (!course.isApproved && course.isPublished) {
      // Rejected: Only approve button
      return (
        <button
          onClick={() => handleAction(course._id, 'approve')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
        >
          Approve
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Course Approvals
        </h2>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 font-medium">
              No pending courses found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const statusInfo = getStatusInfo(course);
              return (
                <div
                  key={course._id}
                  className="bg-white mt-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <ThumbnailImage
                    url={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{course.category}</p>
                    <p className={`text-sm font-medium ${statusInfo.color}`}>
                      Status: {statusInfo.status}
                    </p>
                    <div className="mt-4">{renderButtons(course)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingCourses;
