import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) return <p className="p-4">Cargando perfil...</p>
  if (!isAuthenticated || !user) return <p className="p-4">No estás autenticado.</p>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        ¡Bienvenido, {user.name || user.email}!
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Nombre</label>
          <input
            type="text"
            value={user.name || '—'}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Rol</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 capitalize"
          />
        </div>

        {/* Si querés agregar más datos como dirección, fecha, etc., los agregás acá */}
      </div>
    </div>
  )
}

export default Profile
