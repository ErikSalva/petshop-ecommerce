import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios.js'

const Checkout = () => {
  const { user } = useAuth()
  const { id } = useParams() // <-- id del carrito desde URL

  const [formData, setFormData] = useState({
    nombre: '',
    domicilio: '',
    correo: '',
    telefono: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.name || '',
        correo: user.email || '',
      }))
    }
  }, [user])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await clienteAxios.put(`/orders/${id}/status`, {
        status: 'confirmed',
      })

      setSubmitted(true)
    } catch (err) {
      console.error('Error al confirmar compra:', err)
      setError('No se pudo confirmar la compra. Intenta nuevamente.')
    }
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">¡Gracias por tu compra!</h2>
        <p>Hemos recibido tus datos y te contactaremos pronto.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Datos para la compra</h1>

      <p className="mb-4 text-gray-700 text-sm italic">
        Estos datos serán usados para enviar el producto. Podés modificarlos si querés.
      </p>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Nombre completo:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col">
          Domicilio:
          <input
            type="text"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col">
          Correo electrónico:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col">
          Teléfono:
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="border rounded px-3 py-2 mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  )
}

export default Checkout
