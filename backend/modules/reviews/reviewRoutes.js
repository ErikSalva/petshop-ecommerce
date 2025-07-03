import express from 'express'
import {postReview, getReview } from './reviewController.js';
import authenticateToken from '../../middleware/auth.js';
import { authorizeRole } from '../../middleware/authorizeRole .js';
import { body } from 'express-validator';
const router = express.Router();

router.post('/reviews/:productId', 
    authenticateToken, 
    authorizeRole('user'),
    [
    body('rating')
        .notEmpty().withMessage('El rating es requerido')
        .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un número entero entre 1 y 5')
        .toInt()
    ], 
    postReview
)

router.get('/reviews/:productId', 
    authenticateToken, 
    authorizeRole('user'),
    getReview
)




export default router