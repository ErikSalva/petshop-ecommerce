import { body } from 'express-validator';
import { param } from 'express-validator';


// Validaciones para el endpoint POST /productos
export const validateProductInput = [
  // Campo: title
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isString().withMessage('El título debe ser texto')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
    
  // Campo: description
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser texto')
    .trim()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres'),
    
  // Campo: pet_type_id
  body('pet_type_id')
    .notEmpty().withMessage('El tipo de mascota es obligatorio')
    .isInt({ min: 1 }).withMessage('ID de tipo de mascota no válido'),
    
  // Campo: breed_size_ids (array de IDs)
  body('breed_size_ids')
    .isArray().withMessage('Debe enviar un array de tamaños de raza')
    .custom((value) => {
        if (!value.every(item => {
        // Verifica si es string numérico o número
        return !isNaN(item) && 
                (typeof item === 'string' || typeof item === 'number');
        })) {
        throw new Error('Todos los IDs de tamaño deben ser números válidos');
        }
        return true;
    }),
    // Campo variants
  body('variants')
    .isArray({ min: 1 }).withMessage('Debe enviar al menos una variante')
    .custom((variants) => {
      for (const variant of variants) {
        if (
          typeof variant.weight_value !== 'number' || variant.weight_value <= 0
        ) {
          throw new Error('weight_value debe ser un número mayor a 0 en cada variante');
        }
        if (!['g', 'kg'].includes(variant.weight_unit_id)) {
          throw new Error('weight_unit_id debe ser "g" o "kg" en cada variante');
        }
        if (
          typeof variant.price !== 'number' || variant.price <= 0
        ) {
          throw new Error('price debe ser un número mayor a 0 en cada variante');
        }
        if (
          !Number.isInteger(variant.stock) || variant.stock < 0
        ) {
          throw new Error('stock debe ser un entero mayor o igual a 0 en cada variante');
        }
      }
      return true;
    }),
  // Campo: compositions (array de strings obligatorio)
  body('composition')
    .isArray({ min: 1 }).withMessage('Debe enviar un array de composiciones')
    .custom((value) => {
      for (const comp of value) {
        if (typeof comp !== 'string' || comp.trim().length === 0) {
          throw new Error('Cada composición debe ser una cadena de texto no vacía');
        }
      }
      return true;
    }),
    
];

export const validateVariantIdParam = [
  param('id')
    .isUUID(4).withMessage('El ID de la variante debe ser un UUID válido')
];
