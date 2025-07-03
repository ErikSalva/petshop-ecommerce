import React from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import NavBar from './NavBar'

const Header = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header>
      <TopBar />
      {/* Sólo muestro NavBar si NO estoy en Home */}
      {!isHome && <div className='bg-[#012a46] px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30'><NavBar /></div>}
    </header>
  )
}

export default Header
