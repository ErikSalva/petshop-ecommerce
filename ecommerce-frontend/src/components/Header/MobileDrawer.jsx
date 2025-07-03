import React from 'react';
import { Link } from 'react-router-dom';
import { LuX } from 'react-icons/lu';

const MobileDrawer = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  selectedCategory,
  handleCategoryChange,
  handleLinkClick,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 bottom-0 right-0 w-3/4 max-w-xs bg-[#012a46] text-[#2fd7c3]
          transform transition-transform duration-300 ease-in-out z-50
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
          flex flex-col
        `}
      >
        <div className="flex justify-end p-4 border-b border-[#2fd7c3]">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl text-[#2fd7c3] hover:text-[#feb600]"
            aria-label="Cerrar menú"
          >
            <LuX />
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg font-medium">
          <li>
            <Link to="/" onClick={handleLinkClick} className="hover:text-[#feb600]">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={handleLinkClick} className="hover:text-[#feb600]">
              Tienda
            </Link>
          </li>
          <li>
            <select
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="bg-transparent text-[#2fd7c3] text-lg font-medium cursor-pointer hover:text-[#feb600] focus:outline-none"
            >
              <option value="" disabled>
                Categoría
              </option>
              <option value="gato">Gatos</option>
              <option value="perro">Perros</option>
              <option value="pez">Peces</option>
              <option value="ave">Aves</option>
            </select>
          </li>
          <li>
            <Link to="/about" onClick={handleLinkClick} className="hover:text-[#feb600]">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick} className="hover:text-[#feb600]">
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default MobileDrawer;
