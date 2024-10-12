"use client";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { BellDot, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Header() {
  const { user, isLoaded } = useUser();

  return (
    <div className='p-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md flex justify-between items-center'>
      {/* Search Bar */}
      <div className='flex gap-2 items-center bg-white p-2 rounded-md shadow-sm w-1/2'>
        <Search className='text-gray-500' />
        <input
          type="text"
          placeholder='Search...'
          className='outline-none w-full text-gray-700 bg-transparent placeholder-gray-500'
        />
      </div>

      {/* Get Started Button & Bell Icon */}
      <div className='flex items-center gap-6'>
        <BellDot className='text-white w-6 h-6 cursor-pointer hover:text-gray-200' />

        {isLoaded && user ? (
          <UserButton afterSignOutUrl='/courses' />
        ) : (
          <Link href={'/sign-in'}>
            <Button className='bg-white text-blue-500 hover:bg-gray-200 transition-all'>
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
