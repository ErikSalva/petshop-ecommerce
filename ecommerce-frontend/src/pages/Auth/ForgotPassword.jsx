import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import clienteAxios from '../../config/axios';
import { handleAxiosError } from '../../helpers/handleAxiosError';


const schema = yup.object({
    email: yup.string().required('El campo email es requerido').email('Email inválido')
})



const ForgotPassword = () => {
    const [sent, setSent] = useState(false);

    const{register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

const onSubmit = async (data) => {

    try {
      await clienteAxios.post('/auth/forgot-password', data)
      setSent(true);
    } catch (error) {
      handleAxiosError(error);
    } 
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm" noValidate>
        <h2 className="text-2xl font-semibold mb-4 text-center">Recuperar contraseña</h2>

        {sent ? (
          <p className="text-green-600 text-center mb-4">
            Si el correo existe, se ha enviado un enlace de recuperación.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Enviar enlace de recuperación
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
