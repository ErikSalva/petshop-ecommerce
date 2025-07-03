import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { Outlet } from 'react-router-dom';

const ProtectedRoute  = ({requiredRole}) => {
    // No usamos `useNavigate` aquí porque no debe llamarse directamente durante el renderizado. Tiene que haber una accion antes
    // como un submit o algo
    // en componentes que retornan JSX como este , lo mejor es usar Navigate
    const{ user, isAuthenticated, loading} = useAuth();

     if (loading) {
        // Mientras carga la autenticación, mostramos el spinner centrado
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader color="#36d7b7" size={60} />
        </div>
        );
    }
    if (!isAuthenticated) {
        // Redirige al login si el usuario no está autenticado.
        // `replace` evita que el usuario pueda volver a esta página con el botón "Atrás".
        return <Navigate to="/auth/login" replace />;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute 