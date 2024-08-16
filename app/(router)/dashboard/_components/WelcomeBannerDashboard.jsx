import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs';
function WelcomeBannerDashboard({user}) {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
        <Image src='/piggy.png' alt='calculator'
        width={100} height={100} />
        <div>
            <h2 className='font-bold text-[27px]'>
                Welcome Back! <span  className='text-primary'>{user?.fullName} </span>
            </h2>
            <h2 className='text-gray-500'>
                Explore, Learn and Earn Rewards!
            </h2>
        </div>
            </div>
  )
}

export default WelcomeBannerDashboard