import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { handleAxiosError } from '../../helpers/handleAxiosError';


const schema = yup.object({

  name: yup
    .string()
    .required('El campo nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .email('Email inválido'),

  password: yup
    .string()
    .required('Password es requerido')
    .min(6, 'Mínimo 6 caracteres'),

  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las passwords no coinciden')
    .required('Confirma tu password'),
});

const Register = () => {
  
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  });

  const onSubmit = async (data) => {
     try {
      const res = await clienteAxios.post('/auth/register/', data);
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
        text: 'Revisá tu correo para confirmar tu cuenta',
      });

      navigate('/')
    } catch (error) {
        handleAxiosError(error)
      };
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Abrí tu cuenta</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Repetir contraseña</label>
          <input
            type="password"
            {...register("confirm_password")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
