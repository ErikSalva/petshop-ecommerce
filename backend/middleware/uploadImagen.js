import multer from 'multer';
import { promises as fs } from 'fs';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// Multer es un middleware para Express que gestiona la subida de archivos (multipart/form-data).


// Filtro para aceptar solo imágenes jpeg o png
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Formato de archivo no permitido. Solo JPEG o PNG.'), false); // Rechazar archivo
  }
};

// Almacenamiento en memoria
const storage = multer.memoryStorage();

// Configurar Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export default upload;


//Elimina imágenes de Cloudinary
export const cleanupUploads = async (files, folder = 'petshop-ecommerce') => {
  if (!files?.length) return;

  for (const file of files) {
    try {
      // Extraer UUID del filename (sin extensión)
      const publicId = file.filename.split('.')[0];
      await deleteFromCloudinary(publicId, folder);
      console.log('Imagen eliminada de Cloudinary:', publicId);
    } catch (err) {
      console.error('Error al eliminar imagen de Cloudinary:', err.message);
    }
  }
};

// Elimina imágenes por nombres de archivo
export const cleanupUploadsByFilenames = async (filenames, folder = 'petshop-ecommerce') => {
  if (!filenames?.length) return;

  for (const filename of filenames) {
    try {
      const publicId = filename.split('.')[0];
      await deleteFromCloudinary(publicId, folder);
      console.log('Imagen eliminada de Cloudinary:', publicId);
    } catch (err) {
      console.error('Error al eliminar imagen de Cloudinary:', err.message);
    }
  }
};