import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetail from './pages/student/CourseDetail';
import CourseList from './pages/student/CourseList';
import EnrolledCourses from './pages/student/EnrolledCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import InstructorCourses from './pages/instructor/InstructorCourses';
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingCourses from './pages/admin/PendingCourses';
import UserManagement from './pages/admin/UserManagement';
import LessonPlayer from './pages/student/LessonPlayer';
import AttemptQuiz from './pages/student/AttemptQuiz';
import CreateQuiz from './pages/instructor/CreateQuiz';
import Layout from './components/Layout';

import { useSelector } from 'react-redux';

const App = () => {

  const {user} = useSelector((state)=>state.auth);

return(
  
  <BrowserRouter>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<CourseList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/course/:courseId/lessons" element={<LessonPlayer />} />
            <Route path="/student/attempt-quiz/:courseId" element={<AttemptQuiz />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/instructor/dashboard" element={<InstructorCourses />} />
            <Route path="/instructor/courses" element={<InstructorCourses />} />
            <Route path="/instructor/create-course" element={<CreateCourse />} />
            <Route path="/instructor/create-quiz/:courseId" element={<CreateQuiz />} />
            <Route path="/instructor/enrolled-students/:courseId" element={<CreateQuiz />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<PendingCourses />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
);
};

export default App;
