import Image from 'next/image';
import React from 'react';

function CourseItem({ course }) {
  return (
    <div className='border rounded-xl hover:shadow-lg hover:shadow-purple-400 transition-all duration-300 ease-in-out cursor-pointer bg-white'>
      {/* Course Image */}
      <Image 
        src={course?.banner?.url} 
        width={500} 
        height={150} 
        alt='Course Banner' 
        className='rounded-t-xl object-cover' 
      />
      
      {/* Course Information */}
      <div className='flex flex-col gap-2 p-4'>
        <h2 className='font-bold text-lg text-gray-700'>{course.name}</h2>
        {/* Additional details, like description or number of lessons, can be added here */}
      </div>
    </div>
  );
}

export default CourseItem;
