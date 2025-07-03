import express from 'express'
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, deleteProductVariant } from './productController.js';
import { validateProductInput } from './middleware/productValidations.js';
import { parseVariants } from './middleware/parseVariants.js';
import { validateImages } from './middleware/validateImages.js';
import upload from '../../middleware/uploadImagen.js';
import authenticateToken from '../../middleware/auth.js';
import { authorizeRole } from '../../middleware/authorizeRole .js';


const router = express.Router();

// Como es form-data tengo que parsear los valores para volverlos segun su tipo de dato
router.post(
    '/products',
    authenticateToken,
    authorizeRole('admin'), 
    upload.array('images', 5), 
    validateImages, 
    parseVariants, 
    validateProductInput, 
    createProduct
);

router.put(
    '/products/:id',
    authenticateToken,
    authorizeRole('admin'),
    upload.array('images', 5),
    parseVariants, 
    validateProductInput, 
    updateProduct
);

router.delete(
    '/products/:id',
    authenticateToken,
    authorizeRole('admin'),
    deleteProduct
);

//Muestra todos los productos
router.get('/products', getProducts);
// Busca un producto
router.get('/products/:id', getProduct);


router.get(
  '/admin/products',
  authenticateToken,
  authorizeRole('admin'),
  getProducts
);


router.delete(
  '/admin/products/variants/:id',
  authenticateToken,
  authorizeRole('admin'),
  deleteProductVariant
);


export default router