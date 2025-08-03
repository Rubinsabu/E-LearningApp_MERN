import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const StudentsModal = ({ courseId, onClose }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`instructor/${courseId}/enrolled-students`);
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-scaleIn p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-2xl font-semibold text-gray-800">Enrolled Students</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center py-6 font-medium bg-red-100 rounded-lg">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500 text-center py-6 font-medium">No students enrolled yet.</p>
        ) : (
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student._id}
                className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <span className="text-sm text-gray-500">Enrolled: {formatDate(student.enrolledAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentsModal;