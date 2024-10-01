"use client";
import GlobalAPI from '@/app/_utils/GlobalAPI';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseItem from './CourseItem';

function CourseList() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  // Fetch Course List
  const getAllCourses = () => {
    GlobalAPI.getAllCourseList().then(resp => {
      setCourseList(resp?.courseLists);
    });
  };

  return (
    <div className='p-5 bg-white rounded-lg mt-3'>
      {/* Title and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className='text-[20px] font-bold text-blue-500'>All Courses</h2>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="unfinished">Unfinished</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Courselist */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
        {courseList.map((item, index) => (
          <div key={index}>
            <CourseItem course={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
