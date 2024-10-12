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
    <div className='p-5 bg-gradient-to-r from-purple-50 via-white to-purple-100 rounded-lg mt-3 shadow-lg'>
      {/* Title and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className='text-[22px] font-bold text-purple-600'>All Courses</h2>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px] border-purple-500">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-purple-100">
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="unfinished">Unfinished</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Course List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
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
