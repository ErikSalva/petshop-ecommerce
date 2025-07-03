import express from 'express'
import productRoutes from '../modules/products/productRoutes.js'
import petTypeRoutes from '../modules/petTypes/petTypeRoutes.js'
import breedSizeRoutes from '../modules/breedSizes/breedSizeRoutes.js'
import userRoutes from '../modules/users/userRoutes.js'
import orderRoutes from '../modules/orders/orderRoutes.js'
import reviewRoutes from '../modules/reviews/reviewRoutes.js'
const router = express.Router();

router.use('/', productRoutes)
router.use('/', petTypeRoutes)
router.use('/', breedSizeRoutes)
router.use('/auth', userRoutes)
router.use('/', orderRoutes)
router.use('/', reviewRoutes)


export default router