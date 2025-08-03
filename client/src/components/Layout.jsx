import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
    
  return (
    <div className="bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex pt-16"> {/* pt-16 = height of navbar */}
        {/* Fixed Sidebar */}
        <div className="w-64 fixed top-16 left-0 bottom-0 bg-white shadow-md">
          <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="ml-64 mt-0 p-6 w-full h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
