"use client";
import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import CourseList from './_components/CourseList';
import Leaderboard from '../QuizGame/_components/Leaderboard';

function Courses() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen'>
      {/* Left Container */}
      <div className='col-span-2 space-y-6'>
        {/* Welcome Banner */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <WelcomeBanner />
        </div>

        {/* Course List */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <CourseList />
        </div>
      </div>

      {/* Right Container */}
      <div className='bg-white shadow-md rounded-lg p-6'>
        <Leaderboard />
      </div>
    </div>
  );
}

export default Courses;
