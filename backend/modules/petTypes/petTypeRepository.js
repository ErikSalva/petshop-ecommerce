import { PetType } from "../../models/index.js";
export const getPetTypes = async () =>{
    return await PetType.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
}