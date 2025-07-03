export function errorHandler(err, req, res, next) {
  console.error(err); 
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    error: true,
    message,
    details: err.details ?? null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}   