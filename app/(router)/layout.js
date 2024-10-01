import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'

function Layout({ children }) {
  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className="sm:w-64 hidden sm:block fixed">
        <SideNav />
      </div>

      {/* Main content with margin adjustment for large screens */}
      <div className="sm:ml-64">
        <Header />
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Sidebar for small screens */}
      <div className="sm:hidden">
        <SideNav />
      </div>
    </div>
  )
}

export default Layout
