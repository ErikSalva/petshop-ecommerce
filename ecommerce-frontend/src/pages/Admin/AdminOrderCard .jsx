import React from 'react'

const AdminOrderCard = ({ order }) => {
  return (
    <div className="mb-6 border rounded-xl p-4 bg-white shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm text-gray-500">ID Orden: <span className="text-gray-700">{order.id}</span></p>
          <p className="text-sm text-gray-500">ID Usuario: <span className="text-gray-700">{order.user_id}</span></p>
          <p className="text-sm text-gray-500">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="text-sm text-blue-600 font-medium">
          Estado: {order.order_status?.description || 'Desconocido'}
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {order.order_items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-3 border rounded-md bg-gray-50"
          >
            <div>
              <h3 className="text-md font-semibold text-gray-800">{item.product_title}</h3>
              <p className="text-sm text-gray-600">Tamaño: {item.variant_weight}</p>
              <p className="text-sm text-gray-600">Tipo de mascota: {item.pet_type_name}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-sm text-gray-600">Precio unitario: ${item.unit_price}</p>
            </div>
            <div className="text-right">
              <p className="text-md font-bold text-[#2fd7c3]">${item.subtotal}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-end mt-3">
        <p className="text-md font-bold text-gray-800">Total: ${order.total_price}</p>
      </div>
    </div>
  )
}

export default AdminOrderCard
