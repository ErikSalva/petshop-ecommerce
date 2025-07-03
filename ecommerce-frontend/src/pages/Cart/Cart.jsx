import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios.js'
import CartItemCard from '../../components/Products/CartItemCard .jsx'
import { Link } from 'react-router-dom'
import { handleAxiosError } from '../../helpers/handleAxiosError.jsx'
const Cart = () => {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [cartId, setCartId] = useState(0)

  const fetchCartItems = async () => {
    try {
      const res = await clienteAxios.get('/order/cart/items')
      setCartId(res.data.cart_id)
      setItems(res.data.items)
      setTotal(res.data.total_price)
    } catch (error) {
      handleAxiosError(error)
    }
  }
  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Tu Carrito</h1>
      
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} onItemUpdate={fetchCartItems} onItemDelete={fetchCartItems} />
        ))}
      </div>

      <div className="mt-6 text-right text-lg font-semibold">
        Total: ${total}
      </div>

      <div className="mt-6 text-right">
        <Link
          to={`/cart/checkout/${cartId}`}
          className={`inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            items.length === 0 ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          Comprar
        </Link>
      </div>
    </div>
  )
}

export default Cart