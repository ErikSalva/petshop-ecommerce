import React from 'react'

const PromoBanner = () => {
  return (
    <section className="px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30">
        <div className='w-full py-10'>
            <div className='rounded-2xl bg-[#feb600] flex relative justify-center md:justify-between px-20 py-20 md:py-10 lg:py-5 overflow-hidden'>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-10 gap-4 md:bg-transparent bg-[#fef2d5] p-5 md:p-0 md:rounded-none rounded-3xl">
                    
                    <div>
                        <p className='text-[#29c2b4] text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-4xl font-bold italic'>¿TENÉS UN CACHORRO O GATITO NUEVO?</p>
                        <p className='text-[#29c2b4] text-md lg:text-xl xl:text-xl 2xl:text-xl'> Descubrí todo lo que necesitás para que se sientan como en casa</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                    <a className="px-13 py-3 border-2 border-[#29c2b4] rounded-full text-lg hover:bg-[#29c2b4] transition-colors cursor-pointer text-[#29c2b4] hover:text-white">
                        Ver para gatitos
                    </a>
                    <a className="px-13 py-3 bg-[#2fd7c3] text-white rounded-full text-lg hover:bg-[#29c2b4] transition-colors cursor-pointer">
                        Ver para cachorros
                    </a>
                    </div>
                    
                </div>

                <div className="w-1/2 hidden md:flex justify-center items-center z-10">
                    <img 
                        src="/assets/FeacturedSection/fish.png" 
                        alt="" 
                        className='object-contain'
                    />
                </div>

                {/* Decoraciones solo visibles desde md */}
                <div className="hidden md:block absolute h-[50vw] w-[50vw] rounded-[5vw] bg-[#fef2d5] z-0 rotate-[55deg] left-[-10vw] -translate-y-[15vw]"></div>
                <div className="hidden md:block absolute h-[40vw] w-[35vw] bg-[#fec841] bottom-[-25vw] right-[-5vw] z-0 rotate-[60deg] rounded-[5vw]"></div>
            </div>
        </div>
    </section>
  )
}

export default PromoBanner
