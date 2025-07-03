import Swal from 'sweetalert2';

export function handleAxiosError(error, defaultMessage = 'Ocurrió un error inesperado') {
  const status = error.response?.status;
  const msg = error.response?.data?.message || defaultMessage;

  if (status === 401) {
    Swal.fire('No autorizado', msg, 'error');
  } else if (status === 403) {
    Swal.fire('Acceso denegado', msg, 'error');
  } else if (status === 400) {
    Swal.fire('Error de validación', msg, 'error');
  } else if (status === 409) {
    Swal.fire('Usuario ya registrado', msg, 'error');
  } else {
    Swal.fire('Error', msg, 'error');
  }
}