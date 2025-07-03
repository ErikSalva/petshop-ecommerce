import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import AdminOrderCard from './AdminOrderCard '

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await clienteAxios.get('/admin/orders')
        setOrders(res.data)
      } catch (error) {
        console.error('Error al cargar órdenes del admin:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Órdenes del Sistema</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : orders.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        orders.map(order => (
          <AdminOrderCard key={order.id} order={order} />
        ))
      )}
    </div>
  )
}

export default AdminOrders
