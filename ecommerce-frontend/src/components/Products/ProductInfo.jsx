import { useState, useEffect } from 'react'
import { LuShare2, LuFacebook, LuTwitter, LuInstagram, LuShoppingCart } from 'react-icons/lu'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import Breadcrumb from '../Breadcrumb/Breadcrumb '
import clienteAxios from '../../config/axios.js'
import { useNavigate } from 'react-router-dom'
import { handleAxiosError } from '../../helpers/handleAxiosError.jsx'
import Swal from 'sweetalert2'

const ProductInfo = ({ product }) => {
  const { images, title, description, compositions, variants, pet_type, average_rating, total_reviews } = product
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [selectedButton, setSelectedButton] = useState('description')
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  // esto porque cuando hago click en una card en related product cambia el array de imagenes pero  selectedButton no cambia
  // porque no son iguales, no cambia proque auqnue la card cambia la ruta react no desmonta el compoenten porque sigue siendo
  // /producto/slug-id /producto/otro-slug-otro-id es decir no desmotna productDetail, y el selected solo cambia o toma valor
  // al momento de montar el compoennte
  // es decir  const [selectedImage, setSelectedImage] = useState(images[0]) solo se ejecuta al momento de montar un componente
  // no durante un re render
  // solo para evitar confusion usestate y useffect re renderian el compoenten pero no lo desmontan y vuelve a montarlo
  // va ustate ejecuta un re render si cambia y use ffect si esta vivncualdo algo ejecuta algo despues de ese re render
  // en shop si cambia pero al hacer la comparacion pero no marca de color(borde)
  // esto pasaba porque al comparacion era entre imagetos image[0] y img... siendo que dentro tienen .filename iguales
  //selectedImage y images[0] son siempre objetos diferentes en memoria
  useEffect(() => {
    setSelectedImage(images[0]) // Actualiza a la NUEVA referencia
  }, [images])

  const averageRating = average_rating
  const totalReviews = total_reviews

  const sortedVariants = [...variants].sort((a, b) => a.weight_value - b.weight_value)

  const defaultVariant = sortedVariants[0]

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant)

  const renderStars = () => {
    const stars = []
    let rating = averageRating

    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (rating >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
      rating -= 1
    }
    return stars
  }

  const handleAddToCartBtm = async () => {
    try {
      const res = await clienteAxios.post('/orders/cart/items', {
        variant_id: selectedVariant.id,
        quantity: quantity
      })
      Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `Se agregaron ${quantity} unidad(es) al carrito.`,
        showConfirmButton: false,
        timer: 2000
      })
    } catch (error) {
      handleAxiosError(error)
    }
  }

  const handleBuyNowBtm = async () => {
    try {
      const res = await clienteAxios.post('/orders/cart/items', {
        variant_id: selectedVariant.id,
        quantity: quantity
      })
      navigate('/cart')
    } catch (error) {
      handleAxiosError(error)
    }
  }

  return (
    <div
      className="
        flex flex-col 
        md:flex-row
        p-5 w-full gap-5 
        shadow rounded-3xl
      "
    >
      {/*por defecto flex o flex-row tiene item-streach es decir los dos contenedores miden lo mismo*/}
      {/* Lado Izquierdo: Galería + Share */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        <div className=" flex flex-col gap-6 bg-[#edfcfb] p-3">
          {/* Imagen Principal */}
          <div className="overflow-hidden p-4">
            <img
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/petshop-ecommerce/${selectedImage.filename}`}
              alt={title}
              className="
                object-contain 
                w-full 
                h-64
                md:h-96
              "
            />
          </div>

          {/* Miniaturas */}
          <div className="flex gap-3 overflow-x-auto">
            {images.map((img, index) => (
              <div
                key={index}
                onMouseEnter={() => setSelectedImage(img)}
                className={`p-3 border rounded-md bg-white cursor-pointer transition-colors duration-200 ${
                  selectedImage === img ? 'border-amber-600' : 'border-gray-300'
                }`}
              >
                <img
                  src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/petshop-ecommerce/${img.filename}`}
                  alt={`Imagen ${index}`}
                  className="
                    object-cover
                    h-16 w-16 
                    md:h-24 md:w-24 
                    bg-white
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Compartir */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <LuShare2 className="w-5 h-5" />
          <span>Compartir:</span>
          <a href="#" className="hover:text-blue-600">
            <LuFacebook className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-blue-400">
            <LuTwitter className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-pink-500">
            <LuInstagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lado Derecho: Descripcion + Botones */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5 relative">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: pet_type.name, href: `/shop?category=${pet_type.name}` }
          ]}
        />
        {/*Titulo, precio y estrellas*/}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <h2 className="text-lg font-semibold text-[#2fd7c3]">${selectedVariant.price}</h2>

          <div className="flex gap-5 items-center">
            <div className="flex text-lg gap-3 items-center">
              <div className="flex space-x-1">{renderStars()}</div>
              <span className="text-gray-600 text-md">{averageRating}</span>
            </div>
            <p className="text-gray-600 text-md">{totalReviews} Reseñas</p>
          </div>
        </div>
        {/*Descripcion y Composicion*/}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-2">
            <button
              className={`border-b-2 ${
                selectedButton == 'description'
                  ? 'border-[#2fd7c3] cursor-pointer'
                  : 'border-gray-500'
              }`}
              onClick={() => {
                setSelectedButton('description')
              }}
            >
              Descripción
            </button>
            <button
              className={`border-b-2 ${
                selectedButton === 'composition'
                  ? 'border-[#2fd7c3]'
                  : 'border-gray-500'
              } cursor-pointer`}
              onClick={() => {
                setSelectedButton('composition')
              }}
            >
              Composición
            </button>
          </div>
          <p
            className="
              h-32 
              md:h-52 
              text-sm
              overflow-hidden
            "
          >
            {selectedButton === 'description'
              ? description
              : selectedButton === 'composition'
              ? compositions.map((c, index) => (
                  <div key={index} className="flex flex-col">
                    {c.ingredient}
                  </div>
                ))
              : null}
          </p>
        </div>

        {/*Botones de pesos y de compras*/}
        <div
          className="
            flex flex-col gap-5 
            md:absolute md:bottom-0
            bg-white md:bg-transparent
            p-4 md:p-0
          "
        >
          <div>
            <h2 className="font-semibold mb-2">Seleccionar Peso</h2>
            <div className="flex gap-5">
              {sortedVariants.map((variant, index) => {
                const isSelected =
                  variant.weight_value === selectedVariant.weight_value &&
                  variant.weight_unit_id === selectedVariant.weight_unit_id

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`
                      border p-2 rounded-xl cursor-pointer transition-all
                      ${
                        isSelected
                          ? 'border-orange-500 bg-orange-100 text-orange-700 font-semibold'
                          : 'border-gray-300 hover:border-orange-400'
                      }
                    `}
                  >
                    {variant.weight_value}
                    {variant.weight_unit_id}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sección de stock y control de cantidad */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Stock disponible: <span className="font-semibold">{selectedVariant.stock}</span>
            </p>
            <div className="flex items-center mt-2 gap-3">
              <label htmlFor="quantity" className="text-sm font-medium">
                Cantidad:
              </label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  −
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(prev + 1, selectedVariant.stock))}
                  disabled={quantity >= selectedVariant.stock}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-5">
            <button
              className="
                bg-[#2fd7c3] 
                text-white 
                px-6 py-2 rounded-3xl 
                hover:bg-blue-700 
                cursor-pointer 
                flex gap-2 justify-center items-center
                flex-1
                md:flex-initial
              "
              onClick={handleAddToCartBtm}
            >
              <LuShoppingCart /> Agregar al Carrito
            </button>
            <button
              className="
                border-2 
                border-[#2fd7c3] 
                text-[#2fd7c3] 
                px-6 py-2 
                rounded-3xl 
                hover:bg-gray-100 
                cursor-pointer
                flex-1
                md:flex-initial
              "
              onClick={handleBuyNowBtm}
              
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
