import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import PurchaseItemCard from '../../components/Products/PurchaseItemCard'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await clienteAxios.get('/orders')
        setOrders(res.data)
      } catch (error) {
        console.error('Error al cargar órdenes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mis Compras</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : orders.length === 0 ? (
        <p>No tenés compras realizadas.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="mb-6 border rounded-xl p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-500">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-blue-600 font-medium">Estado: {order.order_status?.description || 'Desconocido'}</p>
            </div>

            <div className="flex flex-col gap-4">
              {order.order_items.map((item, idx) => (
                <PurchaseItemCard key={idx} item={item} />
              ))}
            </div>

            <div className="text-end mt-3">
              <p className="text-md font-bold text-gray-800">Total: ${order.total_price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
