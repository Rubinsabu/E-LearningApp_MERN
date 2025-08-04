import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(form));
      toast.success('User registered successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create User !');
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-3 tracking-tight">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mb-4">Sign up to join our learning community!</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              placeholder="Enter your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="role">
              Register as
            </label>
            <select
              id="role"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-50 text-gray-900 transition"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              value={form.role}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="/login" className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
