import React, {useEffect, useState} from 'react'
import ProductInfo from '../../components/Products/ProductInfo'
import { useParams } from 'react-router-dom'
import RelatedProducts from './RelatedProducts'
import clienteAxios from '../../config/axios'

const ProductDetail = () => {
  const {slugWithId} = useParams()
  const id = slugWithId.slice(-36); 

  const [product, setProduct] = useState(null)
  
  const fetchData = async () =>{
    try {
      const response = await clienteAxios.get(`/products/${id}`)
      setProduct(response.data)
    } catch (error) {
       console.error('Error en fetchData:', error?.response?.data || error.message || error);
    }
  }

  useEffect(()=>{
    fetchData()
  }, [id])

  if (!product) return <p>Cargando...</p>

  // Buscar el producto por ID
  //const product = products.find(p => p.id.toString() === id);

  

  return (
    <div className='px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30'>
      <div className='w-full flex justify-center items-cente my-5'>
        <ProductInfo product={product}/>
      </div>
      <RelatedProducts product={product}/>

    </div>
  )
}

export default ProductDetail