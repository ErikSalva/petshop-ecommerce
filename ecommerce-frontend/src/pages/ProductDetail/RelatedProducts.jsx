import React from 'react'
import ProductCard from '../../components/Products/ProductCard'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import { handleAxiosError } from '../../helpers/handleAxiosError';
const RelatedProducts = ({ product }) => {
  // Filtrar productos relacionados: por tipo de mascota, excluyendo el mismo producto

  const [products, setProducts] = useState([])

  const fetchData = async ()=>{
    try {
      const response = await clienteAxios.get('/products', {
        params: {
          sort: 'popular',
          page: 1,
          category: product.pet_type.name
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
    <div className='w-full py-10 flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <div>
          <p>¿Querés ver más?</p>
          <h2 className='text-xl font-bold text-[#29c2b4]'>Productos Relacionados</h2>
        </div>
        <Link
          to={`/shop?category=${product.pet_type.name}`}
          className="px-4 py-2 bg-transparent border-2 border-[#29c2b4] text-[#29c2b4] rounded-lg hover:bg-[#29c2b4] hover:text-white w-max flex justify-center items-center"
        >
          Ver más <IoIosArrowForward />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (

          products.filter(p => p.id !== product.id).slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No hay productos relacionados disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts
