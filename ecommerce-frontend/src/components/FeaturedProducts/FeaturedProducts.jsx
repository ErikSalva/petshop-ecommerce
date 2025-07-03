import React from 'react'
import ProductCard from '../Products/ProductCard'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios';
import { useState, useEffect } from 'react';
import { handleAxiosError } from '../../helpers/handleAxiosError';

const FeaturedProducts = () => {

  const [products, setProducts] = useState([])

  const fetchData = async ()=>{
    try {
      const response = await clienteAxios.get('/products', {
        params: {
          sort: 'popular',
          page: 1
        }
      })
      setProducts(response.data.data)
      
    } catch (error) {
      handleAxiosError(error)
    }
  }

  useEffect(()=>{
    fetchData()
    
  }, [])


  return (
    <section className='px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30'>
      <div className='w-full py-10 flex flex-col gap-10'>
        <div className='flex justify-between items-center'>
          <div>
            <p>¿Te cuesta elegir los productos adecuados para tu mascota?</p>
            <h2 className='text-xl font-bold text-[#29c2b4]'>Productos Destacados</h2>
          </div>
          <Link
            to={`/shop`} 
            className="px-4 py-2 bg-transparent border-2 border-[#29c2b4] text-[#29c2b4] rounded-lg hover:bg-[#29c2b4] hover:text-white w-max flex justify-center items-center">Ver más <IoIosArrowForward/>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
        </div>
      
        
      </div>
    </section>
  )
}

export default FeaturedProducts