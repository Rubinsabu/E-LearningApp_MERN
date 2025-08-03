import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) return null;

  const renderLinks = () => {
    const role = user.role;
    const links = {
      student: [
        { path: '/courses', label: 'Course Listing' },
        { path: '/enrolled-courses', label: 'Enrolled Courses' },
      ],
      instructor: [
        { path: '/instructor/courses', label: 'My Courses' },
        { path: '/instructor/create-course', label: 'Create Course' },
      ],
      admin: [
        { path: '/admin/dashboard', label: 'Admin Panel' },
        { path: '/admin/users', label: 'Manage Users' },
        { path: '/admin/courses', label: 'Course Approvals' },
      ],
    };

    return links[role]?.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
          ${
            location.pathname === link.path
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
      >
        {link.label}
      </Link>
    ));
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white-400">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {renderLinks()}
      </nav>
    </aside>
  );
};

export default Sidebar;