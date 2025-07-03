import React from 'react'
import SearchBar from './SearchBar'
import { LuPhone } from "react-icons/lu";
import { LuMail } from "react-icons/lu";

const TopBar = () => {
  return (
    <div className='px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30 py-5 bg-[#2fd7c3] border-indigo-600 flex flex-row gap-5 justify-between items-center'>
        <div className='flex items-center gap-2'>
          < LuPhone className='text-white w-6 h-6'/>
          <p className='text-white text-sm sm:text-base md:text-lg lg:text-xl'>1800 029 300</p>
        </div>
        <SearchBar/>
        <div className='flex items-center gap-2'>
          < LuMail className='text-white w-6 h-6'/>
          <p className='text-white text-sm sm:text-base md:text-lg lg:text-xl'>1800 029 300</p>
        </div>
    </div>
  )
}

export default TopBar