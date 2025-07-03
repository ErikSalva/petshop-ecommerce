import React from 'react'

const About = () => {
  return (
    <section className='px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30'>
      
      <div className='flex justify-between items-center align-middle py-10'>
        <div className='flex flex-col max-w-1/2 gap-5'>
          <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold text-[#2fd7c3] " > Sobre nosotros</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui excepturi provident illo quas, minus corrupti distinctio accusamus molestias repellat cupiditate non nulla possimus, alias quibusdam, illum aperiam assumenda vitae molestiae?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quam minus sed voluptatibus ullam ipsam aliquam totam ipsum reprehenderit commodi non, voluptas quibusdam esse consequatur quia mollitia ea tempora officia iusto ratione facere nulla omnis at consequuntur? Similique eveniet, provident velit consequatur voluptatum repudiandae, eum voluptates veritatis quaerat vitae autem.</p>
        </div>

        <div className="max-w-[350px]">
          <img
              src="/assets/Hero/banner-fig.png"
              alt="Hero bg"
              className="max-h-full max-w-full object-contain"
          />

        </div>
      </div>
    </section>


  )
}

export default About