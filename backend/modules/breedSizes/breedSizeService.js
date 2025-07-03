import * as breedSizeRepository from './breedSizeRepository.js'

export const getBreedSizes = async () =>{
    return await breedSizeRepository.getBreedSizes()
}