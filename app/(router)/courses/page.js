"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'

function Courses() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5'>
      {/*Left Container */}
      <div className='col-span-2'>
      <WelcomeBanner/>

      {/*Course List */} 
        <CourseList/>

      </div>
      {/*Right Container */} 
      <div>
      Right Section
      </div>
    </div>
  )
}

export default Courses