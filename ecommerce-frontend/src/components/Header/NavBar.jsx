import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LuHeart, LuShoppingCart, LuUser, LuStore, LuMenu, LuX } from 'react-icons/lu';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import { useAuth } from '../../context/AuthContext';
import { handleAxiosError } from '../../helpers/handleAxiosError';

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isHome = pathname === '/';

  // Clases comunes de padding
  const basePadding = 'py-4 sm:px-2 lg:px-5';

  // Si estoy en Home: transparente sobre el Hero
  const homeStyles = 'bg-transparent shadow-none py-2 xl:py-10 ';

  // En cualquier otra página: fondo blanco con sombra
  const defaultStyles = 'shadow-md py-2 xl:py-10';

  const handleCategoryChange = (e) => {
    const categoria = e.target.value;
    setSelectedCategory("");
    if (categoria) {
      navigate(`/shop?category=${categoria}`);
      setMobileMenuOpen(false); 
    }
  };

  // Cerrar menú móvil al clickear un link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className={`relative ${basePadding} ${isHome ? homeStyles : defaultStyles}`}>
      <div className='flex items-center justify-between w-full'>
        
        <div className='flex gap-10'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2 cursor-pointer'>
            <LuStore className='w-7 h-7 text-[#2fd7c3]' />
            <span className='text-xl font-bold text-[#feb600]'>iEcommerce</span>
          </Link>

          {/* Links de escritorio */}
          <ul className='hidden lg:flex items-center gap-6 text-[#2fd7c3] text-sm font-medium'>
            <li>
              <Link to='/' className='cursor-pointer hover:text-red-600'>Inicio</Link>
            </li>
            <li>
              <Link to='/shop' className='cursor-pointer hover:text-red-600'>Tienda</Link>
            </li>

            {/* Select de categorías */}
            <li>
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="bg-transparent text-[#2fd7c3] text-sm font-medium cursor-pointer hover:text-red-600 focus:outline-none"
              >
                <option value="" disabled>Categoría</option>
                <option value="gato">Gatos</option>
                <option value="perro">Perros</option>
                <option value="pez">Peces</option>
                <option value="ave">Aves</option>
              </select>
            </li>
            <li>
              <Link to='/about' className='cursor-pointer hover:text-red-600'>Nosotros</Link>
            </li>
            <li>
              <Link to='/contact' className='cursor-pointer hover:text-red-600'>Contacto</Link>
            </li>
          </ul>
        </div>
        
        {/* Iconos y menú hamburguesa */}
        <div className='flex items-center gap-4 text-[#2fd7c3]'>
          <Link to='/favorites'> 
            <LuHeart className='md:w-7 md:h-7 w-5 h-5 cursor-pointer hover:text-red-600' />
          </Link>
          <Link to='/cart'>
            <LuShoppingCart className='md:w-7 md:h-7 w-5 h-5 cursor-pointer hover:text-red-600' />
          </Link>
          
          {/* Ícono usuario con toggle */}
          <div className='relative'>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-red-600"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <LuUser className="md:w-7 md:h-7 w-5 h-5" />
              {isAuthenticated && <span className="text-sm font-medium text-[#2fd7c3]">{user?.name || 'Usuario'}</span>}
            </div>
            {/* Triángulo tipo bocadillo */}
            {userMenuOpen &&( <div className="absolute top-10 right-3 w-4 h-4 bg-white rotate-45 z-20"></div>)}
            
            {/* Menú desplegable */}
            {userMenuOpen && (
              <>
                <div className="absolute right-0 mt-5 w-40 bg-white rounded shadow-lg text-[#012a46] font-medium z-20">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Perfil
                      </Link>

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Panel de Admin
                        </Link>
                      )}
                      {user?.role === 'user' && (
                        <Link
                          to="/my-orders"
                          className="block px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Mis compras
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          try {
                            await logout();
                            setUserMenuOpen(false);
                            navigate('/');
                          } catch (error) {
                            handleAxiosError(error, 'No se pudo cerrar sesión');
                          }
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="block px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        to="/auth/register"
                        className="block px-4 py-2 hover:bg-[#feb600] hover:text-white cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Botón para abrir/cerrar menú móvil */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen
              ? <LuX className="w-6 h-6 text-[#2fd7c3]" />
              : <LuMenu className="w-6 h-6 text-[#2fd7c3]" />
            }
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      <MobileDrawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleLinkClick={handleLinkClick}
      />
    </nav>
  );
};

export default NavBar;
