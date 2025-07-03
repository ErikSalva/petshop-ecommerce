import React from 'react'
import NavBar from '../Header/NavBar'  // ajustá la ruta si hace falta

const Hero = () => {

  // position: relative, absolute, o fixed.
  return (

    <section
      className="
        relative
        px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30
        flex flex-col
        bg-[#fff5d6]
        overflow-hidden
        rounded-b-4xl
      "
    >
      {/* NavBar dentro del Hero sólo en Home */}
      {/* NavBar con posición fija sobre todo */}
      <div className="relative z-30">
        <NavBar />
      </div>

      {/* Decoraciones geométricas h-x en rem */}
      <div className="flex h-[80vh] items-center justify-center xl:justify-between relative">
        <div
          className="
            absolute
            bottom-[-40vw] left-[-4vw]
            w-[40vw] h-[40vw]
            bg-[#fedf80]
            max-w-[1100px] max-h-[1100px]
            rotate-[60deg]
            rounded-[100px]
            z-0
            hidden xl:block
          "
        ></div>

        <div
          className="
            absolute
            top-[-45vw]
            left-[-25vw]
            w-[50vw] h-[50vw]
            bg-[#012a46]
            max-w-[1500px] max-h-[1500px]
            min-w-[250px] min-h-[250px]
            rotate-[30deg]
            rounded-[10vw]
            z-0
            
          "
        ></div>

        <div
          className="
            flex flex-col
            justify-center items-center
            xl:items-start
            gap-10
            text-center xl:text-left
            z-20
            max-w-3/4 xl:max-w-lg 2xl:max-w-xl
          "
        >
          <div
            className="
              w-[5vw] h-[5vw]
              bg-[#feb600]
              rotate-[25deg]
              rounded-lg xl:rounded-2xl
              hidden xl:block
              max-w-[100px] max-h-[100px]
            "
          ></div>
          <h1 className="text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-[#2fd7c3]">
            Delicias para tu mascota
          </h1>

          <h2 className="text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium text-[#2fd7c3] leading-normal">
            Tenemos una gran variedad de premios ricos para mimar a tu mejor amigo
          </h2>

          <a className="px-13 py-3 bg-[#2fd7c3] text-white rounded-4xl text-lg hover:bg-[#29c2b4] transition-colors cursor-pointer">
            Shop Now
          </a>

        </div>

        {/* Contenedor para imagen + decorativos */}
        <div className="relative w-1/2 h-full hidden xl:flex">
          {/* Decorativo azul - responsive tamaño y posición */}
          <div
            className="
              absolute
              bottom-[-20vw]
              left-[-10vw]
              w-[40vw] h-[40vw]
              bg-[#2fd7c3]
              max-w-[1600px] max-h-[1600px]
              rotate-[10deg]
              rounded-[5vw]
              z-0
            "
          ></div>

          {/* Decorativo amarillo - responsive tamaño y posición */}
          <div
            className="
              absolute
              bottom-[-20vw]
              left-[-5vw]
              w-[45vw] h-[45vw]
              bg-[#feb600]
              max-w-[1800px] max-h-[1800px]
              rotate-[30deg]
              rounded-[5vw]
              z-10
            "
          ></div>
          <div className="h-full w-full flex items-end z-20 pr-[10vw]">
            <img
              src="/assets/Hero/banner-fig.png"
              alt="Hero bg"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
