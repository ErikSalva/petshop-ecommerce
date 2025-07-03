import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleAxiosError } from '../../helpers/handleAxiosError';
import clienteAxios from '../../config/axios';
const schema = yup.object({
    password: yup
        .string()
        .required('Password es requerido')
        .min(6, 'Mínimo 6 caracteres'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las passwords no coinciden')
        .required('Confirma tu password'),

})


const ResetPassword = () => {

  const [success, setSuccess] = useState(false)
  const { token } = useParams();

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })

 
  const onSubmit = async (data) => {
    try {
      await clienteAxios.post(`/auth/forgot-password/${token}`, data)
      setSuccess(true);
      
    } catch (error) {
      handleAxiosError(error)
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Restablecer contraseña</h2>

        {success ? (
          <p className="text-green-600 text-center mb-4">
            Tu contraseña se actualizó correctamente.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Nueva contraseña</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Confirmar contraseña</label>
              <input
                type="password"
                {...register('confirm_password')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
                Actualizar contraseña
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
