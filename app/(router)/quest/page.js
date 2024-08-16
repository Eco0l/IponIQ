"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import WelcomeBannerQuest from './_components/WelcomeBannerQuest';


function Dashboard() {
  const{user}=useUser();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5'>
      {/*Left Container */}
      <div className='col-span-2'>
        <WelcomeBannerQuest user={user}/>


      </div>
      {/*Right Container */} 
      <div>
      Right Section
      </div>
    </div>
  )
}

export default Dashboard