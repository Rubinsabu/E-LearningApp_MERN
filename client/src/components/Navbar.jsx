import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-200 text-gray-800 px-6 py-4 flex justify-between items-center shadow-sm border-b border-gray-200">
      <div className="text-xl font-extrabold tracking-wide">
        <Link to={`/${user.role}/dashboard`} className="hover:text-blue-600 transition-colors">
          E-Learn Platform
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-gray-600">Welcome, {user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
