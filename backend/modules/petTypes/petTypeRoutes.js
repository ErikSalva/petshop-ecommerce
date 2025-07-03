import express from 'express'
import { getPetTypes } from './petTypeController.js';


const router = express.Router();


router.get('/pet-types', getPetTypes)

export default router