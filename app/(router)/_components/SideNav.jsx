"use client";
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; // Burger and Close icons
import { BicepsFlexedIcon, BookOpen, CircleHelpIcon, LayoutDashboard, Play } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State for mobile nav
  const menu = [
    {
      id: 8,
      name: 'DashBoard',
      icon: LayoutDashboard,
      path: '/dashboard',
      auth: user,
    },
    {
      id: 1,
      name: 'All Courses',
      icon: BookOpen,
      path: '/courses',
      auth: true,
    },
    {
      id: 2,
      name: 'QuizGames',
      icon: Play,
      path: '/QuizGame',
      auth: user,
    },
    {
      id: 3,
      name: 'Quest',
      icon: CircleHelpIcon,
      path: '/quest',
      auth: user,
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log('path', path);
  }, [path]);

  // Toggle the sidebar for mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Burger Menu for Small Screens */}
      <div className="p-4 bg-white shadow-sm border md:hidden flex justify-between items-center">
        <Image src="/logo.svg" alt="logo" width={120} height={60} />
        <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />} {/* Show X when open, burger when closed */}
        </button>
      </div>

      {/* Sidebar for larger screens and toggled for small screens */}
      <div
        className={`p-5 bg-white shadow-sm border h-screen md:block ${
          isOpen ? 'block' : 'hidden'
        } md:relative fixed top-0 left-0 w-[250px] z-50`}
      >
        {/* Close Button inside Sidebar (for mobile view) */}
        <div className="flex justify-between items-center mb-6">
          <Image src="/logo.svg" alt="logo" width={170} height={80} />
          <button onClick={toggleMenu} className="md:hidden text-gray-500">
            <X size={28} /> {/* Close icon for closing the sidebar */}
          </button>
        </div>

        <hr className="mt-7" />

        {/* Menu List */}
        <div className="mt-8">
          {menu.map(
            (item, index) =>
              item.auth && (
                <Link href={item.path} key={index}>
                  <div
                    className="flex gap-3 mt-2 p-3 text-[18px] items-center
                text-gray-500 cursor-pointer hover:bg-primary hover:text-white 
                rounded-md transition-all ease-in-out duration-200"
                  >
                    <item.icon />
                    <h2>{item.name}</h2>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
