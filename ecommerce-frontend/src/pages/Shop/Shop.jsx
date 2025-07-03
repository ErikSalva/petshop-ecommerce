import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // para manejar query params

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb ';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/Products/ProductCard';
import { handleAxiosError } from '../../helpers/handleAxiosError';
import clienteAxios from '../../config/axios';

const Shop = () => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducs] = useState(0);
  
  const [searchParams, setSearchParams] = useSearchParams();

  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  
  const sortParam = searchParams.get('sort') || 'popular'; // valor por defecto
  const [sort, setSort] = useState(sortParam);

  const fetchData = async () => {
    try {
      const params = Object.fromEntries([...searchParams])

      /* Esto es como hacer {
         params: {
            search: searchParams.get('search'),
            page: searchParams.get('page'),
            breedSizes: searchParams.get('breedSizes'),
          }
        }
      */
      const response = await clienteAxios.get('/products', {
        params
      })
      setProducts(response.data.data)
      setTotalPages(response.data.totalPages)
      setTotalProducs(response.data.total)
    } catch (error) {
      handleAxiosError(error)
    }
  }

  useEffect(() => {
    setSort(searchParams.get('sort') || 'popular');
    fetchData()
  }, [searchParams])

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', pageNumber);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', selectedSort);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  return (
    <section className="px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30 py-10">
      
      {/* Migas de pan */}
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tienda", href: "/shop" }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <FilterSidebar />
        </div>

        {/* Contenido principal */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {/* Encabezado */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4">
            <p className="text-xl font-semibold">Tienda</p>
            <span className="text-sm text-gray-600">
              Mostrando {totalProducts} productos
            </span>

            <div className="ml-auto flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select 
                onChange={handleSortChange}
                className="bg-transparent text-sm text-gray-800 focus:outline-none"
                value={sort}
              >
                <option value="popular">Popularidad</option>
                <option value="priceLow">Precio: menor a mayor</option>
                <option value="priceHigh">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Grilla de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {/* Devuelve un array con length del total de páginas ejemplo páginas 3 [0,1,2] pero no tendría valor serían undefined */}
              {/* Con esto sí tiene valor Array.from({ length: 3 }, (_, i) => i + 1) // [1, 2, 3] */}
              {/* array.from(length, lo que tiene cada índice) en este caso el segundo parámetro es un map que llena cada índice */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded-full border ${
                    currentPage === index + 1
                      ? 'bg-[#29c2b4] text-white border-[#29c2b4]'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Shop;
