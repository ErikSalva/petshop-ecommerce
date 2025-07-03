import { createContext, useState, useEffect, useContext } from 'react';
import clienteAxios from '../config/axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await clienteAxios.get('/auth/me', {
                withCredentials: true
                });
                setUser(data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

        
    const login = async (credentials) => {

        try {
            await clienteAxios.post('/auth/login', credentials, {
                withCredentials: true
            });
            
            // Verificar sesión después de login
            const { data } = await clienteAxios.get('/auth/me', {
                withCredentials: true
            });
            
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true };

        } catch (error) {

            throw error
        }
    };


    const logout = async () => {
        try {
            await clienteAxios.post('/auth/logout', {}, {
                withCredentials: true
            });
        } catch (error) {
            // esto no mostrar en produccion if env. == produccion si
            throw error
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };



    return (
        <AuthContext.Provider value={{ 
            isAuthenticated,
            loading,
            user,
            login,
            logout
        }}>
        {children}
        </AuthContext.Provider>
    
    )

}

export default AuthContext;


export const useAuth = () => {
  return useContext(AuthContext);
};