import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const ConfirmAccount = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await clienteAxios.get(`/auth/confirm/${token}`);
        setMessage(response.data.message || 'Cuenta confirmada correctamente.');
        setError(false);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Hubo un error al confirmar la cuenta.');
        setError(true);
      } finally {
        setLoading(false); 
      }
    };

    confirmAccount();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <h2 className="text-lg text-gray-600">Procesando confirmación...</h2>
        ) : (
          <>
            <h2 className={`text-2xl font-bold mb-4 ${error ? 'text-red-600' : 'text-green-600'}`}>
              {error ? 'Error al confirmar' : '¡Cuenta confirmada!'}
            </h2>
            <p className={`text-base ${error ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;
