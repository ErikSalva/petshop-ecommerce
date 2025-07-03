import express from 'express'
import { getBreedSizes } from './breedSizeController.js';


const router = express.Router();


router.get('/breed-sizes', getBreedSizes)

export default router