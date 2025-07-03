import { useEffect, useState } from 'react'
import React from 'react'
import ProductCard from '../../components/Products/ProductCard'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { handleAxiosError } from '../../helpers/handleAxiosError'

const AdminProducts  = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () =>{
    try {
      const response = await clienteAxios.get('/admin/products', {
        params:{
          page: currentPage
        },
        
      })
      setProducts(response.data.data)
      setTotalPages(response.data.totalPages)
      
    } catch (error) {
      handleAxiosError(error)
    }
  }

  useEffect(() =>{
    fetchData()
  }, [currentPage])


  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const onDelete = async (productId) =>{

    const result = await Swal.fire({
            title: "¿Estas seguro de eliminar el producto?",
            text: "Esto nose podra revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!"
        });

      if (result.isConfirmed) {
        try {
          const response = await clienteAxios.delete('/products/' + productId, { withCredentials: true } )
          console.log('llega acaaaa', response.data)
          Swal.fire({
              title: "Eliminado!",
              text: response.data.message,
              icon: "success"
          });

          fetchData()
        } catch (error) {
            const message = error.response?.data?.message
            Swal.fire({
                  title: "Error en la eliminación",
                  text: message || 'Hubo un problema al eliminar el producto.',
                  icon: "error"
            });
        }
        
      }
     
  }


  return (
    <>
      <h2 className='text-xl mb-5 font-bold'>Listado de Productos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
        {products?.map(product => (
          <ProductCard key={product.id} product={product} showActions={true} onDelete={onDelete}/>
          
        ))}

        
      </div>

      {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {
            Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded-full border ${
                    currentPage === pageNumber
                      ? 'bg-[#29c2b4] text-white border-[#29c2b4]'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })
            }
          </div>
        )}
        
    </>
  )
}

export default AdminProducts 