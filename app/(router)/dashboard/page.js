"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import WelcomeBannerDashboard from './_components/WelcomeBannerDashboard';
import Leaderboard from '../QuizGame/_components/Leaderboard';
import DashboardDetails from './_components/DashboardDetails';

function Dashboard() {
  const{user}=useUser();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5'>
      {/*Left Container */}
      <div className='col-span-2'>
      <WelcomeBannerDashboard user={user}/>

      <DashboardDetails />

      </div>
      {/*Right Container */} 
      <div>
      <Leaderboard />
      </div>
    </div>
  )
}

export default Dashboard