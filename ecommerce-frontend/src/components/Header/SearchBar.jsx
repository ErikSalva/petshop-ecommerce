import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { LuSearch } from "react-icons/lu";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation()


  // Vacía el input al cambiar de ruta
  useEffect(() => {
    if (location.pathname !== "/tienda") {
      setSearchTerm("");
    }
  }, [location.pathname]) // también se puede usar [location] si querés limpiar incluso si cambian los parámetros

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTerm = searchTerm.trim(); // elimina los espacios al inciio y al final
    if (trimmedTerm) {
      navigate(`/shop?search=${encodeURIComponent(trimmedTerm)}`); // convierte todos esos caracteres problemáticos en una representación segura usando %
      // ejem: const busqueda = "croquetas para perros & gatos"; Resultado: "croquetas%20para%20perros%20%26%20gatos"
      //encodeURIComponent es una función de JavaScript que codifica una cadena para que pueda ser usada de forma segura en una URL como parte de los parámetros de consulta (query params).
      // los " " , los& y los + o ? tambien lso remplaza porque en la URL significan algo
    } else {
      // Si querés, podés navegar solo a /shop sin query
      navigate('/shop');
    }
  };


  return (
    <form  onSubmit={handleSubmit} className='max-w-lg w-full '>
      <div className='bg-white w-full rounded-xl flex items-center '>
        <input 
          className='w-full h-full px-5 py-3 text-[#2fd7c3] outline-none text-sm sm:text-base md:text-md lg:text-lg'
          type='text'
          placeholder='Encontrá lo mejor para tu mascota...'
          value={searchTerm}

          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type='submit' className='mx-5 cursor-pointer '>
          <LuSearch className='w-6 h-6 text-[#2fd7c3] hover:opacity-80' />
        </button>

      </div>
    </form>
  )
}

export default SearchBar