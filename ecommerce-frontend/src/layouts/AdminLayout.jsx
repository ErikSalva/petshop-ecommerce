import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Panel Admin</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
            }
          >
            Pedidos
          </NavLink>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}