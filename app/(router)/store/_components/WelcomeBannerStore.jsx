import Image from 'next/image'
import React from 'react'

function WelcomeBannerStore() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
        <Image src='/piggy.png' alt='calculator'
        width={100} height={100} />
        <div>
            <h2 className='font-bold text-[27px]'>
                Store<span  className='text-primary'></span>
            </h2>
            <h2 className='text-gray-500'>
                Buy Items!
            </h2>
        </div>
            </div>
  )
}

export default WelcomeBannerStore