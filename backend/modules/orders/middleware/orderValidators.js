import { body } from 'express-validator';

// Validación para agregar ítem al carrito (POST /orders/cart/items)
export const validateAddItemToCart = [
  body('variant_id')
    .notEmpty().withMessage('El ID de la variante es obligatorio')
    .isUUID().withMessage('El ID de la variante debe ser un UUID válido'),

  body('quantity')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un entero mayor a 0'),
];

// Validación para actualizar ítem del carrito (PUT /orders/cart/items/:itemId)
export const validateUpdateCartItem = [
  body('quantity')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un entero mayor a 0'),
];


// Validación para actualizar el estado del pedido (PUT /orders/:id/status)
export const validateUpdateOrderStatus = [
  body('status')
    .notEmpty().withMessage('El nuevo estado es obligatorio')
    .isString().withMessage('El nuevo estado debe ser un string')
    .trim()
];
