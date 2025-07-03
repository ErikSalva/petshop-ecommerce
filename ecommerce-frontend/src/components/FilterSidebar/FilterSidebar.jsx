import { FaCat, FaDog, FaFish, FaDove } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import FilterTag from './FilterTag ';
//| Hook              | Sirve para                            | Ejemplo URL                          |
//| ----------------- | ------------------------------------- | ------------------------------------ |
//| `useParams`       | Parámetros de ruta (path params)      | `/products/123` (id del producto)    |
//| `useSearchParams` | Parámetros de consulta (query params) | `/products?category=dogs&size=small` |

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams() te devuelve una instancia de URLSearchParams.
  // Cuando usás const [searchParams, setSearchParams] = useSearchParams();,
  // searchParams es un objeto de tipo URLSearchParams.

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sizes, setSizes] = useState({
    small: false,
    medium: false,
    large: false,
  });

  const handleCategoryClick = (category) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('category', category);
    newParams.set('page', '1'); // .set() es un método predefinido de la clase nativa de JavaScript llamada URLSearchParams.
    setSearchParams(newParams);
  };

  /* Opcion si quiero que borre al hacer doble click en la categoría, lógica toggle
  const handleCategoryClick = (category) => {
    const currentCategory = searchParams.get('category');
    const newParams = new URLSearchParams(searchParams.toString());

    if (currentCategory === category) {
      newParams.delete('category'); // deselecciona
    } else {
      newParams.set('category', category); // selecciona
    }

    setSearchParams(newParams);
  };
  */

  const handleSizeChange = (size) => {
    const updatedSizes = {
      ...sizes,
      [size]: !sizes[size],
    };
    setSizes(updatedSizes);

    // .key devuelve un array con las propiedades del objeto  ["small", "medium", "large"] y luego filtro las que son true igual que decir updatedSize.small solo que uso[key] porque si no buscaría literalmente la propiedad .key 
    const selectedSizes = Object.keys(updatedSizes).filter((key) => updatedSizes[key]);
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedSizes.length) {
      newParams.set('breedSizes', selectedSizes.join(','));
      // searchParams.set() modifica solo el parámetro que le indicás (sizes), 
      // pero no borra los otros parámetros que ya estaban en searchParams.
    } else {
      newParams.delete('breedSizes');
    }
    newParams.set('page', '1');
    setSearchParams(newParams); //  setSearchParams NO espera un objeto plano como useState, 
    // sino: Otro URLSearchParams o algo convertible (tipo array de arrays: [["category", "dogs"]])
    // setSearchParams({ category: 'dogs' }) // Esto no actualiza correctamente la URL
    // const newParams = new URLSearchParams();
    // newParams.set('category', 'dogs');
    // setSearchParams(newParams);
  };

  const handlePriceEnter = (e) => {
    if (e.key === 'Enter') {
      const newParams = new URLSearchParams(searchParams.toString());

      if (minPrice) {
        newParams.set('minPrice', minPrice);
      } else {
        newParams.delete('minPrice');
      }

      if (maxPrice) {
        newParams.set('maxPrice', maxPrice);
      } else {
        newParams.delete('maxPrice');
      }
      newParams.set('page', '1');
      setSearchParams(newParams);
      setMinPrice('');
      setMaxPrice('');
    }
  };

  useEffect(() => {
    const breedSizesParam = searchParams.get('breedSizes'); // Ejemplo: "small,large"
    if (breedSizesParam) {
      const selectedSizes = breedSizesParam.split(','); // ["small", "large"]
      const newSizes = {
        small: selectedSizes.includes('small'),
        medium: selectedSizes.includes('medium'),
        large: selectedSizes.includes('large'),
      };
      setSizes(newSizes);
    } else {
      // Si no hay parámetro, desmarcá todos
      setSizes({
        small: false,
        medium: false,
        large: false,
      });
    }
  }, [searchParams]);

  return (
    <aside className="w-64 p-4 bg-white shadow rounded-xl space-y-6">

      {/* Filtros activos */}
      {(searchParams.get('category') || searchParams.get('minPrice') || searchParams.get('maxPrice') || searchParams.get('breedSizes')) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchParams.get('category') && (
            <FilterTag
              label={searchParams.get('category')}
              onRemove={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('category');
                setSearchParams(newParams);
              }}
            />
          )}

          {searchParams.get('minPrice') && (
            <FilterTag
              label={`Desde $${searchParams.get('minPrice')}`}
              onRemove={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('minPrice');
                setSearchParams(newParams);
              }}
            />
          )}

          {searchParams.get('maxPrice') && (
            <FilterTag
              label={`Hasta $${searchParams.get('maxPrice')}`}
              onRemove={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('maxPrice');
                setSearchParams(newParams);
              }}
            />
          )}

          {searchParams.get('breedSizes')?.split(',').map((size) => (
            <FilterTag
              key={size}
              label={size.charAt(0).toUpperCase() + size.slice(1)} // Capitaliza
              onRemove={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                const sizes = searchParams.get('breedSizes')?.split(',').filter((s) => s !== size);
                if (sizes.length > 0) {
                  newParams.set('breedSizes', sizes.join(','));
                } else {
                  newParams.delete('breedSizes');
                }
                setSearchParams(newParams);
              }}
            />
          ))}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-2">Categorías</h2>
        <ul className="space-y-2">
          <li
            className="flex items-center gap-2 cursor-pointer hover:text-[#2fd7c3]"
            onClick={() => handleCategoryClick('gato')}
          >
            <FaCat /> <span>Gatos</span>
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer hover:text-[#2fd7c3]"
            onClick={() => handleCategoryClick('perro')}
          >
            <FaDog /> <span>Perros</span>
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer hover:text-[#2fd7c3]"
            onClick={() => handleCategoryClick('pez')}
          >
            <FaFish /> <span>Peces</span>
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer hover:text-[#2fd7c3]"
            onClick={() => handleCategoryClick('ave')}
          >
            <FaDove /> <span>Aves</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Filtros</h2>

        {/* Filtro por precio */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-1">Precio</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onKeyDown={handlePriceEnter}
              className="w-20 px-2 py-1 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={handlePriceEnter}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>

        {/* Filtro por tamaño */}
        <div>
          <h3 className="text-md font-semibold mb-1">Tamaño de raza</h3>
          <div className="space-y-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sizes.small}
                onChange={() => handleSizeChange('small')}
              />
              Pequeño
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sizes.medium}
                onChange={() => handleSizeChange('medium')}
              />
              Mediano
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sizes.large}
                onChange={() => handleSizeChange('large')}
              />
              Grande
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
