import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { LuStore } from 'react-icons/lu'

const Footer = () => {
  return (
    <footer className="px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30 bg-[#fef2d5] rounded-t-4xl">
      <div className='py-10 w-full flex flex-col gap-10'>

        {/* Suscripción */}
        <div className='flex flex-col lg:flex-row justify-between items-center bg-[#2fd7c3] p-10 rounded-2xl'>
          <p className='text-white text-xl sm:text-2xl font-bold text-center lg:text-left'>¡Unite ahora y obtené ofertas exclusivas!</p>
          
          <div className='flex flex-col sm:flex-row gap-10 bg-white p-5 rounded-2xl items-center w-full lg:w-3/4 '>
            <input 
              className='w-full h-full px-5 py-3 bg-white border-1 rounded-xl outline-none text-sm sm:text-base md:text-md lg:text-lg'
              type='text'
              placeholder='Encontrá lo mejor para tu mascota...'
            />
            <a className="whitespace-nowrap px-13 py-3 bg-[#2fd7c3] text-white rounded-xl text-lg hover:bg-[#29c2b4] transition-colors cursor-pointer">
              Suscribirme
            </a>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300" />

        {/* Secciones del footer */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 w-full">

          {/* Logo y redes */}
          <div className='flex flex-col gap-10 items-center lg:items-start '>
            <div className='flex items-center gap-2'>
              <LuStore className='w-7 h-7 text-[#2fd7c3]' />
              <span className='text-xl font-bold text-[#feb600]'>iEcommerce</span>
            </div>
            <div className='flex gap-10'>
              <FaFacebook className='text-4xl hover:text-[#2fd7c3]'/>
              <FaSquareXTwitter className='text-4xl hover:text-[#2fd7c3]'/>
              <FaInstagram className='text-4xl hover:text-[#2fd7c3]'/>
              <FaYoutube className='text-4xl hover:text-[#2fd7c3]'/>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-left w-full lg:w-auto">
            <div className='flex flex-col gap-3'>
              <p className='text-lg font-semibold'>Enlaces</p>
              <div className='flex flex-col'>
                <a href="" className='hover:text-blue-500'>Sobre nosotros</a>
                <a href="" className='hover:text-blue-500'>Contacto</a>
                <a href="" className='hover:text-blue-500'>Política de envíos</a>
                <a href="" className='hover:text-blue-500'>Términos y condiciones</a>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-lg font-semibold'>Mi cuenta</p>
              <div className='flex flex-col'>
                <a href="" className='hover:text-blue-500'>Registrarse</a>
                <a href="" className='hover:text-blue-500'>Iniciar sesión</a>
                <a href="" className='hover:text-blue-500'>Mis datos</a>
                <a href="" className='hover:text-blue-500'>Cerrar sesión</a>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-lg font-semibold'>Mascotas populares</p>
              <div className='flex flex-col'>
                <a href="" className='hover:text-blue-500'>Gatos</a>
                <a href="" className='hover:text-blue-500'>Perros</a>
                <a href="" className='hover:text-blue-500'>Peces</a>
                <a href="" className='hover:text-blue-500'>Aves</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300" />
      </div>
    </footer>
  )
}

export default Footer
