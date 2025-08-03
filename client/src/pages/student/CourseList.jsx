import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import ThumbnailImage from '../../components/ThumbnailImage';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`/student/courses?search=${search}&category=${category}`);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [search, category]);

  return (
    
    <div className="p-8 bg-gray-70 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-400 pb-2">Browse Courses</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-200 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <input
          type="text"
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-200 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="block bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9">
              <ThumbnailImage 
                url={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
                placeholderText={course.title.split(' ').join('+')}
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{course.title}</h3>
              <p className="text-sm text-teal-600 font-semibold mb-3">{course.category}</p>
              <span className="inline-block bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                View Course
              </span>
            </div>
          </Link>
        ))}
      </div>
      {courses.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">No courses found. Try adjusting your search.</p>
      )}
    </div>
  );
};

export default CourseList;