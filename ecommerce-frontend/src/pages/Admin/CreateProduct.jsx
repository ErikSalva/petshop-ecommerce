import React, {useEffect, useState} from 'react'
import clienteAxios from '../../config/axios'
import { LuTrash2 } from "react-icons/lu";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { handleAxiosError } from '../../helpers/handleAxiosError';

const CreateProduct = () => {

  const [product, setProduct] = useState({
    title: '',
    description: '',
    composition: []
  });
  const navigate = useNavigate();


  const [variants, setVariants] = useState([
    { weight_value: '', weight_unit_id: '', price: '', stock: '' }
  ]);
  const [petTypes, setPetTypes] = useState([]);
  const [breedSizes, setBreedSizes] = useState([]);
  const [compositionInput, setCompositionInput] = useState('');

  
  const [selectedBreedSizes, setSelectedBreedSizes] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('');

  const[images, setImages] = useState('');

  const fetchData = async () =>{
    try {
      const resPetTypes = await clienteAxios.get('/pet-types');
      const resBreedSizes = await clienteAxios.get('/breed-sizes');
      setPetTypes(resPetTypes.data);
      setBreedSizes(resBreedSizes.data);
    } catch (error) {
      handleAxiosError(error)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])
  

  const handleAddVariant = () => {
    setVariants([
        ...variants,
        { weight_value: '', weight_unit_id: '', price: '', stock: '' }
    ]);
  };

  const handleDeleteVariant = (indexToDelete) => {
    setVariants(variants.filter((_, index) => index !== indexToDelete));
  };

  // Aca tambiem podria pasa el valor anterior (prev) depende del estado anterior
  const handleCheckboxChange = (e) =>{
    const { value, checked } = e.target;
    if(checked){
      setSelectedBreedSizes([...selectedBreedSizes, value])
    }
    else{
      setSelectedBreedSizes(selectedBreedSizes.filter(id => id !== value))
    }

  }
  const addProduct = async (e) =>{
    e.preventDefault();

    // Validar datos mínimos antes de enviar
    if (!product.title || !product.description  ) {
      Swal.fire({
        title: 'Faltan datos',
        text: 'Completa todos los campos obligatorios.',
        icon: 'warning'
      });
      return;
    }

    // Form-data para que acepte imagenes
    const formData= new FormData();
    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('pet_type_id', selectedPetType)
    formData.append('breed_size_ids',JSON.stringify(selectedBreedSizes))
    formData.append('variants',JSON.stringify(variants))
    formData.append('composition', JSON.stringify(product.composition));

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]); 
    }

     try {
      const res = await clienteAxios.post('/products', formData, { // config de axios
          headers:{
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
      })
      
      if (res.status === 201){
        Swal.fire({
          title: "Se agregó el producto con exito!",
          text: res.data.message,
          icon: "success"
        });

      }
       
      navigate('/admin')



    } catch (error) {
      const message = error.response?.data?.message || 'Hubo un error inesperado';

      Swal.fire({
        title: "Hubo un error!",
        text: `${message}`,
        icon: "error",
        
      });
    }

  }

  

  /* Acá no no estoy reemplazando composition, sino agregando un nuevo valor al array existente, o sea, 
  el nuevo estado depende del anterior. Por eso se necesita prev. en cambioe en el setProduct({...product, title: e.target.value}
  no hace falta porque en realidad reemplaza todo el valor de title asi que no importa el estado anteriror si no el ultimo set*/
  const handleAddComposition = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = compositionInput.trim();
      if (trimmed !== '' && !product.composition.includes(trimmed)) {
        setProduct(prev => ({
          ...prev,
          composition: [...prev.composition, trimmed]
        }));
      }
      setCompositionInput('');
    }
  };

  const handleRemoveComposition = (ingredient) => {
    setProduct(prev => ({
      ...prev,
      composition: prev.composition.filter(item => item !== ingredient)
    }));
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Crear nuevo producto</h2>

      <form className="space-y-6" onSubmit={addProduct}>
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setProduct({...product, title: e.target.value})}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setProduct({...product, description: e.target.value})}
          />
        </div>

        {/* Tipo de mascota */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de mascota</label>
           <select
            name="pet_type_id"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setSelectedPetType(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {petTypes.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tamaños de raza */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamaños de raza</label>
          <div className="flex flex-col gap-2">
            {breedSizes.map(size => (
              <label key={size.id} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="breed_size_ids"
                  value={size.id}
                  checked={selectedBreedSizes.includes(size.id.toString())}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {handleCheckboxChange(e)}}
                />
                {size.name}
              </label>
            ))}
          </div>
        </div>
        
        {/* Composicion del producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Composición (Ingredientes)</label>
          <input
            type="text"
            value={compositionInput}
            onChange={e => setCompositionInput(e.target.value)}
            onKeyDown={handleAddComposition}
            placeholder="Escribí un ingrediente y presioná Enter"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="mt-3 flex flex-wrap gap-2">
            {product.composition.map((item, index) => (
              <span key={index} className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveComposition(item)}
                  className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Variantes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variantes</label>

          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="number"
                  name={`weight_value_${index}`}
                  placeholder="Peso"
                  value={variant.weight_value}
                  onChange={e => {
                    const updated = [...variants];
                    updated[index].weight_value = e.target.value;
                    setVariants(updated);
                  }}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <select
                  name={`weight_unit_id_${index}`}
                  value={variant.weight_unit_id}
                  onChange={e => {
                    const updated = [...variants];
                    updated[index].weight_unit_id = e.target.value;
                    setVariants(updated);
                  }}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Unidad</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  {/* Más unidades si necesitás */}
                </select>
                <input
                  type="number"
                  name={`price_${index}`}
                  placeholder="Precio"
                  value={variant.price}
                  onChange={e => {
                    const updated = [...variants];
                    updated[index].price = e.target.value;
                    setVariants(updated);
                  }}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  name={`stock_${index}`}
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={e => {
                    const updated = [...variants];
                    updated[index].stock = e.target.value;
                    setVariants(updated);
                  }}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteVariant(index)}
                  className={`mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer ${index === 0 ?'invisible' : 'block'}`}
                  
                >
                  <LuTrash2 className='text-xl'/>
                </button>
              </div>
            ))}

            {/* Botón para agregar otra variante */}
            <button
              type="button"
              onClick={handleAddVariant}
              className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Agregar otra variante
            </button>
          </div>
        </div>


        {/* Carga de imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Imágenes</label>
          <input
            type="file"
            name="imagenes"
            onChange={(e) => setImages(e.target.files)}
            multiple
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        {/* Botón de enviar */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            Crear producto
          </button>
        </div>
      </form>
    </div>
    
  )
}

export default CreateProduct