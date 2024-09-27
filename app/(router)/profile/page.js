"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import WelcomeBannerProfile from './_components/WelcomeBannerProfile';
import Leaderboard from '../QuizGame/_components/Leaderboard';


function Dashboard() {
  const{user}=useUser();
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5'>
      {/*Left Container */}
      <div className='col-span-2'>
        <WelcomeBannerProfile user={user}/>


      </div>
      {/*Right Container */} 
      <div>
      <Leaderboard />
      </div>
    </div>
  )
}

export default Dashboard