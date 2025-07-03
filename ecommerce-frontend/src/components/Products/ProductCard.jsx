import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, showActions = false, onDelete}) => {
  const { title, variants, images, slug, average_rating, total_reviews} = product

  // Para mostrar el precio, el más barato
  // Precio mas barato entre las variantes:
  const price = Math.min(...variants.map(v => v.price));
  // Math.min(...[2500, 6000, 9500]); // se convierte en Math.min(2500, 6000, 9500)
  //Math.min([2500, 6000, 9500]); // devuelve NaN

  // Rating promedio y total reviews
  const averageRating = average_rating
  const totalReviews = total_reviews

  // Función para renderizar las estrellas (5 estrellas max)
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

  return (

    <>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:max-w-xs p-5 group hover:cursor-pointer">
        <Link to={"/product/" + slug + "-" + product.id}>
          {/* Imagen */}
          <div className="bg-[#edfcfb] h-96 md:h-64 flex items-center justify-center overflow-hidden p-5">
            <img
              src={images?.[0]?.filename ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/petshop-ecommerce/${images[0].filename}` : null}
              alt={title}
              className="object-contain h-full w-full"
            />
          </div>

          {/* Texto */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate group-hover:text-blue-500 transition-colors duration-100">{title}</h3>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">${price}</span>

              <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                {renderStars()}
                <span className="text-gray-600">({totalReviews})</span>
              </div>
            </div>

          </div>
        </Link>
        {/* Acciones */}
        {showActions && (
          <div className="mt-4 flex justify-between gap-2">
            <Link
              to={`/admin/products/edit/` + slug + "-" + product.id}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full text-center"
            >
              Editar
            </Link>

            <button
              onClick={() => onDelete?.(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 w-full cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        )} 
      </div> 
      
      
    </>

  )
}

export default ProductCard