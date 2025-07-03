import { body } from 'express-validator';

// Validaciones para el endpoint POST /auth/login
export const validateLoginInput = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email debe ser válido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const validateForgotPasswordInput = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email debe ser válido')
    .normalizeEmail(),
];

export const validateResetPasswordInput = [
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];