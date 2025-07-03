import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { handleAxiosError } from '../../helpers/handleAxiosError';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object({
  email: yup.string().required('El campo email es requerido').email('Email inválido'),
  password: yup.string().required('Password es requerido')
    
})

const Login = () => {

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()
  const { login } = useAuth();
  
  const onSubmit = async (data) => {


    try {
      const res = await login(data)
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido/a',
      });
      navigate('/')

    } catch (error) {
      handleAxiosError(error);
    }
    
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm" noValidate>
        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Login
        </button>

        {/* Links extra abajo */}
        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            ¿No tenés cuenta?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:underline cursor-pointer">
              Registrate
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/auth/forgot-password" className="text-blue-600 hover:underline cursor-pointer">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
