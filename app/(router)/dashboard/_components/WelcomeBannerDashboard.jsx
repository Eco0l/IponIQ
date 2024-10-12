import Image from 'next/image';
import React from 'react';

function WelcomeBannerDashboard({ user }) {
  return (
    <div className='flex gap-5 items-center bg-gradient-to-r from-purple-50 via-white to-purple-100 rounded-xl p-6 shadow-lg'>
      <Image src='/piggy.png' alt='calculator'
        width={100} height={100} className='rounded-full' />
      <div>
        <h2 className='font-bold text-[27px] text-purple-600'>
          Welcome Back! <span className='text-primary'>{user?.fullName}</span>
        </h2>
        <h2 className='text-gray-500'>
          Explore, Learn and Earn Rewards!
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
