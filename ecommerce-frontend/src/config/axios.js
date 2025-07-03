import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // tu API base
  withCredentials: true,    // <-- aquí para que lo incluya siempre.. para que acepte recibir y tambien envia cookies en las peticiones

});



/*// Interceptor para manejar errores de autenticación
clienteAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Puedes redirigir al login o manejar el error según tu flujo
      console.error('Sesión expirada o no autenticado');
      // Opcional: limpiar estado de autenticación
      // const { logout } = useAuth(); // Necesitarías un mecanismo para acceder al contexto aquí
    }
    return Promise.reject(error);
  }
);*/
export default clienteAxios;