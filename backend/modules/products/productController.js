import * as productService from './productService.js';
import { cleanupUploads } from '../../middleware/uploadImagen.js';
import { validationResult } from 'express-validator';
import { uploadToCloudinary } from '../../config/cloudinary.js';

const createProduct = async (req, res, next) => {
  // Valida los resultados de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Errores de validación'); 
    err.status = 400;
    err.details = errors.array();
    return next(err);
  }

  const uploadedFiles = [];
  try {

    // Subir las imágenes a Cloudinary
    if (req.files?.length) {
      for (const file of req.files) {
        const format = file.mimetype.split('/')[1]; // 'jpeg' o 'png'
        const result = await uploadToCloudinary(file.buffer, 'petshop-ecommerce', format);

        // Solo guardamos el filename como querés
        uploadedFiles.push({
          filename: result.filename // esto es UUID + extensión
        });
      }
    }

    //Todos los datos estan parseados  los array y demas porque si no form-data lo trae como string
    // Aca pasa al Service si la validación HTTP es exitosa
    const data = await productService.createProduct(req.body, uploadedFiles);
    res.status(201).json({ message: 'Producto creado con imagenes' });
  } catch (error) {
    // Elimina los archivos subidos si hay error
    if (uploadedFiles.length) {
      await cleanupUploads(uploadedFiles); // Borramos solo con filename
    }
    next(error);
  }
};


const getProducts = async (req, res, next) =>{
  try {
    const  { search, category, breedSizes, minPrice, maxPrice, sort = 'popular', page = 1 } = req.query;
    const limit = 12;
    const offset = (parseInt(page) - 1) * limit;// esto es para saber cuestos registros saltarse al momentod de buscar en la bd
    // ejem: offset = (3 - 1) * 12 = 24 → la consulta va a saltar los primeros 24 productos y mostrar los siguientes 12.


    const filters = {
      search,
      category,
      breedSizes,
      minPrice,
      maxPrice,
      sort,
      limit,
      offset,
      page: parseInt(page) || 1,
    };

    const { products, total } = await productService.getProducts(filters, req.user);
    res.json({
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) =>{
  try {
    const product = await productService.getProduct(req.params.id)
    res.json(product);
  } catch (error) {
    next(error);
  }
}

const updateProduct = async (req, res, next) =>{
  // Valida los resultados de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Errores de validación'); 
    err.status = 400;
    err.details = errors.array();
    return next(err);
  }
  const uploadedFiles = [];
  try {
    if (req.files?.length) {
      for (const file of req.files) {
        const format = file.mimetype.split('/')[1]; // ejemplo: 'jpeg'
        const result = await uploadToCloudinary(file.buffer, 'petshop-ecommerce', format);

        uploadedFiles.push({
          filename: result.filename // UUID.ext
        });
      }
    }
    const data = await productService.updateProduct(req.body, uploadedFiles, req.params.id);
    res.status(201).json({ message: 'Producto creado con imagenes', data });
  } catch (error) {
    // Elimina los archivos subidos si hay error
    if (uploadedFiles.length) {
      await cleanupUploads(uploadedFiles);
    }
    next(error);
  }
}

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await productService.deleteProduct(id);
    
    if (result.wasDeactivated) {
      // Caso cuando el producto fue desactivado (tenía órdenes asociadas)
      res.status(200).json({ 
        message:'Producto desactivado (tenía pedidos asociados)',
        action: 'deactivated'
      });
    } else {
      // Caso cuando el producto fue borrado físicamente
      res.status(200).json({ 
        message: 'Producto eliminado con éxito',
        action: 'deleted'
      });
    }
  } catch (error) {
    next(error);
  }
};


const deleteProductVariant = async (req, res, next) =>{
  const {id} = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Errores de validación'); 
    err.status = 400;
    err.details = errors.array();
    return next(err)
  }
  
  try {
    await productService.deleteProductVariant(id)
    res.status(200).json({message: 'Variante eliminada con exito'})
  } catch (error) {
    next(error)
  }

}

export{
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteProductVariant
}