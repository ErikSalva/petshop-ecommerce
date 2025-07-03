import React from 'react'

const Contact = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        
        {/* Formulario */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-[#2fd7c3]">Contacto</h2>
          <p className="text-gray-600 mb-6">
            Envíanos un mensaje. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mensaje</label>
              <textarea
                rows="4"
                placeholder="Escribí tu mensaje..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              ></textarea>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="accent-teal-500" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Acepto los <a href="#" className="text-teal-500 underline">Términos y Condiciones</a>
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#2fd7c3] hover:bg-teal-600 text-white px-6 py-2 rounded transition cursor-pointer"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Imagen del mapa */}
        <div className="w-full lg:w-1/2">
          <img
            src="/assets/Contact/googlemaps.jpg"
            alt="Ubicación en el mapa"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
