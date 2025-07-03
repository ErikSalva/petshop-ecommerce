import * as breedSizeService from './breedSizeService.js'

const getBreedSizes = async (req, res, next) =>{

    try {
        
        const breedSizes = await breedSizeService.getBreedSizes()
        res.json(breedSizes)
    } catch (error) {
        next(error)
    }

}

export {
    getBreedSizes
}