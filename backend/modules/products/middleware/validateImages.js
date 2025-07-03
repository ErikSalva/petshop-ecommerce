export function validateImages(req, res, next) {
  if (!req.files || req.files.length === 0) {
    const error = new Error('Debes subir al menos una imagen del producto');
    error.status = 400;
    return next(error); 
  }
  next();
}