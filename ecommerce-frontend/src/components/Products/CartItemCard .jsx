import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import { handleAxiosError } from '../../helpers/handleAxiosError';

const CartItemCard = ({ item, onItemUpdate, onItemDelete }) => {
  const imageUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/petshop-ecommerce/${item.variant.product.images[0]?.filename}`
  const productLink = `/product/${item.variant.product.slug}${item.variant.product.id}`

  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const maxStock = item.variant.stock
  const itemId = item.id

  const updateQuantity = async (newQty) => {
    setIsUpdating(true)
    try {
      const res = await clienteAxios.put(`/orders/cart/items/${itemId}`, { quantity: newQty })
      setQuantity(newQty)
      if (onItemUpdate) onItemUpdate(itemId, newQty)
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleIncrement = () => {
    if (quantity < maxStock && !isUpdating) {
      updateQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1 && !isUpdating) {
      updateQuantity(quantity - 1)
    }
  }

  const handleDelete = async () => {
    try {
      await clienteAxios.delete(`/orders/cart/items/${itemId}`)
      if (onItemDelete) onItemDelete(itemId)
    } catch (error) {
      console.error('Error eliminando item', error)
    }
  }

  return (
    <div className="flex gap-4 p-4 border rounded-xl shadow-sm bg-white items-center justify-between">
      {/* Imagen + info */}
      <div className="flex gap-4 items-center flex-1">
        <img 
          src={imageUrl} 
          alt={item.product_title} 
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <Link to={productLink}>
            <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors">
              {item.product_title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">Tamaño: {item.variant_weight}</p>
          <p className="text-sm text-gray-500">Tipo de mascota: {item.pet_type_name}</p>
          <p className="text-sm text-gray-500">Stock disponible: {maxStock}</p>
        </div>
      </div>

      {/* Controles de cantidad + subtotal */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={quantity <= 1 || isUpdating}
          >−</button>

          <span className="px-4 py-1 min-w-[40px] text-center">
            {isUpdating ? (
              <span className="animate-pulse text-gray-500 text-sm">⌛</span>
            ) : quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={quantity >= maxStock || isUpdating}
          >+</button>
        </div>

        <p className="text-md text-[#2fd7c3] font-bold">${item.subtotal}</p>

        <button 
          onClick={handleDelete}
          className="text-sm text-red-500 hover:underline cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default CartItemCard
