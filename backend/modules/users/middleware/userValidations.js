import { body } from 'express-validator';

// Validaciones para el endpoint POST /usuarios (registro o creación)
// express-validatior guarda los erroes en un campo del body que luegos son checkeador con validationResult en el Controller
export const validateUserInput = [
    // name
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    // email
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido')
        .normalizeEmail(),

    // password (no está en el modelo Sequelize pero asumo que llega en el req para registrarse)
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirm_password')
        .notEmpty().withMessage('La confirmación de la contraseña es obligatoria')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
        }),

];