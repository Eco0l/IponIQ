"use client"
import React, { useEffect } from 'react'
import { BicepsFlexedIcon, BookOpen, CircleHelpIcon, LayoutDashboard, Notebook, Play, Store, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import Link from 'next/link'


function SideNav() {
    const {user}= useUser();
    const menu=[
        {
            id:8,
            name:'DashBoard',
            icon:LayoutDashboard,
            path:'/dashboard',
            auth: user
        },
        {
            id:1,
            name:'All Courses',
            icon:BookOpen,
            path:'/courses',
            auth: true
        },
        {
            id:2,
            name:'QuizGames',
            icon:Play,
            path:'/QuizGame',
            auth: user
        },
        {
            id:3,
            name:'Quest',
            icon:CircleHelpIcon,
            path:'/quest',
            auth: user
        },
           
    ]
    const path=usePathname();
    useEffect(()=>{
        console.log("path",path)
    },[])

  return (
    <div className='p-5 bg-white 
    shadow-sm border h-screen'>
        <Image src='/logo.svg' alt='logo'
        width={170} height={80} />
        
        <hr className='mt-7'></hr>
        {/*Menu List */}
        <div className='mt-8'> 
            {menu.map((item, index)=>item.auth&&(
                <Link href={item.path}>
                <div className='flex gap-3 mt-2 p-3 text-[18px] items-center
                text-gray-500 cursor-pointer
                hover:bg-primary
                 *:hover:text-white
                 rounded-md
                 transition-all ease-in-out duration-200'>
                    <item.icon/>
                    <h2>{item.name}</h2>
                    </div>
                    </Link>
            ))}
            
        </div>
        
        
    </div>
  )
}

export default SideNav