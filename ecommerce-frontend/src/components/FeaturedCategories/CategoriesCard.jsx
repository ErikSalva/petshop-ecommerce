import React from 'react'
import { LuArrowDown } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const CategoriesCard = ({
  image,
  title,
  subtitle,
  btnText,
  reverse = false,
  big = false,
  bg = '#f3f3f3',
  limited=false,
  link = "#"
}) => {
  return (
    <div
      className={`
        relative flex
        ${limited ? 'flex-col-reverse' : reverse ? 'flex-row-reverse' : 'flex-row'}  
        ${big ? 'h-[400px]' : 'h-[400px]'} 
        rounded-xl 
        overflow-hidden 
        shadow-md 
        w-full 
        max-w-[1000px]
      `}
      style={{ backgroundColor: bg }}
    >
      <div className={`
        ${limited ? 'w-full h-1/2' : 'absolute'}
        ${!limited && big ? 'w-[70%] h-full' : ''}
        ${!limited && !big ? 'w-[60%] h-full' : ''}        
      `}>
        <img
          src={image}
          alt={title}
          className={`w-full h-full ${reverse ? 'object-contain' : 'object-cover'} `}
        />
      </div>

      <div className={`flex ${reverse ? 'justify-start' :  'justify-end '} flex-row  items-start p-6 w-full h-full z-10`}>
        
        <div className={`flex ${ limited? 'flex-row items-end w-full' : 'flex-col'} gap-10 justify-center items-center` }>
    
            <div className='flex flex-col gap-3'>
                <p className={`px-4 py-2 bg-[#3d4142] text-white rounded-lg w-max ${limited? 'block': 'invisible'}`}>Limited Stock</p>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-gray-600 uppercase">{subtitle}</p>
            </div>
            <LuArrowDown className={`text-4xl ${limited ? 'hidden' : 'block'}`}/>
            
            <Link
              to={link}
              className="cursor-pointer px-4 py-2 bg-transparent border-2 border-black text-black rounded-lg hover:bg-[#29c2b4] w-max"
            >
              {btnText}
            </Link>

        </div>

      </div>
    </div>
  )
}

export default CategoriesCard
