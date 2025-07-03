import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Sube un archivo a Cloudinary

const uploadToCloudinary = async (buffer, folder = 'petshop-ecommerce', format = 'png') => {
  const public_id = uuidv4(); // Genera un UUID
  const filename = `${public_id}.${format}`; // Formato: UUID + extensión
  
  // Convertir buffer a base64
  const base64Data = buffer.toString('base64');
  const dataUri = `data:image/${format};base64,${base64Data}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id, // Uso el UUID como public_id
    resource_type: 'image',
    format,
    transformation: [{ quality: 'auto:best' }]
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
    filename // Devuelve el nombre en formato UUID.extensión
  };
};

//Elimina una imagen de Cloudinary
const deleteFromCloudinary = async (publicId, folder = 'petshop-ecommerce') => {
  return await cloudinary.uploader.destroy(`${folder}/${publicId}`);
};

export { cloudinary, uploadToCloudinary, deleteFromCloudinary };
