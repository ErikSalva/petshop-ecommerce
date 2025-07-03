import { Link } from "react-router-dom";

export default function Dashboard() {
  const resumen = {
    productos: 42,
    pedidos: 15,
    pendientes: 3,
    ingresos: "$12.300"
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-gray-500">Productos</h2>
          <p className="text-2xl font-bold">{resumen.productos}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-gray-500">Pedidos</h2>
          <p className="text-2xl font-bold">{resumen.pedidos}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-gray-500">Pendientes</h2>
          <p className="text-2xl font-bold">{resumen.pendientes}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-gray-500">Ingresos</h2>
          <p className="text-2xl font-bold">{resumen.ingresos}</p>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="bg-blue-500 text-white p-4 rounded-xl text-center hover:bg-blue-600"
        >
          Ver Productos
        </Link>
        <Link
          to="/admin/products/new"
          className="bg-green-500 text-white p-4 rounded-xl text-center hover:bg-green-600"
        >
          Crear Producto
        </Link>
        <Link
          to="/admin/orders"
          className="bg-purple-500 text-white p-4 rounded-xl text-center hover:bg-purple-600"
        >
          Ver Pedidos
        </Link>
      </div>
    </div>
  );
}
