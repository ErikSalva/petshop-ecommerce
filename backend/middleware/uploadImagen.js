import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';

// Multer es un middleware para Express que gestiona la subida de archivos (multipart/form-data).
// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads')); // Guardar en uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase(); // Obtener extensión (.png, .jpg, etc.)
    cb(null, uuidv4() + ext); // Asignar un nombre único usando UUID + extensión original
  }
});

// Filtro para aceptar solo imágenes jpeg o png
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Formato de archivo no permitido. Solo JPEG o PNG.'), false); // Rechazar archivo
  }
};

// Configurar Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;

// Función para eliminar archivos en caso de rollback
export const cleanupUploads = async (files) => {
  if (!files?.length) return;

  for (const file of files) {
    const filePath = path.join('uploads', file.filename);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error al eliminar archivo:', filePath, err.message);
    }
  }
};

export const cleanupUploadsByFilenames = async (filenames) => {
  if (!filenames?.length) return;

  for (const filename of filenames) {
    const filePath = path.resolve('uploads', filename);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error al eliminar archivo:', filePath, err.message);
    }
  }
};
