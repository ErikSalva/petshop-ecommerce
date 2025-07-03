import express from 'express'
import { addItemToCart, updateCartItem, deleteCartItem, getCartItems, updateOrderStatus, getOrders, getAllOrders } from './orderController.js'

import { validateAddItemToCart, validateUpdateCartItem, validateUpdateOrderStatus } from './middleware/orderValidators.js'

import authenticateToken from '../../middleware/auth.js';
import { authorizeRole } from '../../middleware/authorizeRole .js'

const router = express.Router()


// Ruta para agregar un item al carrito si no existe lo crea
router.post('/orders/cart/items', authenticateToken, authorizeRole('user'), validateAddItemToCart, addItemToCart  )
// Ruta para actualizar la cantidad de un item(detallePedido) del carrito
router.put('/orders/cart/items/:itemId', authenticateToken, authorizeRole('user'), validateUpdateCartItem, updateCartItem)
// Elimina un item de un carrito(Order)
router.delete('/orders/cart/items/:itemId', authenticateToken, authorizeRole('user'), deleteCartItem)


// Obtiene los items del carrito de un usuario y tambien el precio total de carrito
router.get('/order/cart/items', authenticateToken, authorizeRole('user'), getCartItems)

// Cambiar estado (confirmed, paid, cancelled ) 
router.put('/orders/:id/status', authenticateToken, authorizeRole('user', 'admin'), validateUpdateOrderStatus, updateOrderStatus)
router.get('/orders', authenticateToken, authorizeRole('user'), getOrders) 
router.get('/admin/orders', authenticateToken, authorizeRole('admin'), getAllOrders) 


export default router
