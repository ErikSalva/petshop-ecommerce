
import * as petTypeRepository from './petTypeRepository.js';


export const getPetTypes = async () =>{
    return await petTypeRepository.getPetTypes()
}