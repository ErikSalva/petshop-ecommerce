import { BreedSize } from "../../models/index.js"

export const getBreedSizes = async () =>{

    return BreedSize.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
}