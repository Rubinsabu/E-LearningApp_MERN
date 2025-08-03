import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, approvedCourses: 0});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('/admin/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalCourses}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Approved Courses</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.approvedCourses}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/admin/courses"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Manage Courses
          </Link>
          <Link
            to="/admin/users"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;