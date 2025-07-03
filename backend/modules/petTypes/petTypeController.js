import * as petTypeService from './petTypeService.js';


const getPetTypes = async (req, res, next) =>{
    try {
        const petTypes = await petTypeService.getPetTypes()
        res.json(petTypes);
    } catch (error) {
        next(error)
    }

}

export{
    getPetTypes
}