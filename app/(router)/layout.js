import React from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

function Layout({ children }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      {/* Sidebar for larger screens */}
      <div className="sm:w-64 hidden sm:block fixed inset-y-0 z-50">
        <SideNav />
      </div>

      {/* Main content with margin adjustment for large screens */}
      <div className="sm:ml-64">
        <Header />
        <main className="p-4 sm:p-6 bg-white shadow-md rounded-lg m-4 sm:m-6">
          {children}
        </main>
      </div>

      {/* Sidebar for small screens */}
      <div className="sm:hidden fixed inset-y-0 z-50">
        <SideNav />
      </div>
    </div>
  );
}

export default Layout;
