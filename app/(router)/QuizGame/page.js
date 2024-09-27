"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import WelcomeBannerQuiz from './_components/WelcomeBannerQuiz';
import Leaderboard from './_components/Leaderboard';



function QuizGame() {
  const{user}=useUser();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5'>
      {/*Left Container */}
      <div className='col-span-2'>
        <WelcomeBannerQuiz user={user}/>


      </div>
      {/*Right Container */} 
      <div>
      <Leaderboard />
      </div>
    </div>
  )
}

export default QuizGame