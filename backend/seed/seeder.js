import breedSizes from './BreedSize.js';

import petTypes from './PetType.js';

import orderStatuses from './orderStatuses.js';
// aca hago lo mismo de arriba pero aca ya lo importo con las relaciones que a su vez index.js ya improta en si el modelo
import { BreedSize, PetType, OrderStatus, Order} from "../models/index.js"


import db from "../config/db.js";

//otra foram seria import  {exit} from 'node:process y solo pongo exit(1)
const importarDatos = async()=>{

    try {
        //Autenticar
        await db.authenticate()
        // Generar las columnas
        await db.sync()
        //insertamos los datos 


        //await Categoria.bulkCreate(categorias)
        //await Precio.bulkCreate(precios) 
        // si no dependen los querys uno de los otros esta bien hacer dos await
        // si son inpendientes podemos ejecutar los dos en simultaneo, inicin al mismo tiempo

        await Promise.all([
            //BreedSize.bulkCreate(breedSizes),
            //PetType.bulkCreate(petTypes),
            OrderStatus.bulkCreate(orderStatuses)
            
        ])

        console.log('Datos importados correctamente')
        process.exit(0) // finalizo pero es correcto
        
    } catch (error) {
        console.log(error)
        process.exit(1)  // finalizo pero por un error
    }
}


const eliminarDatos = async() =>{
    try {
        //await Promise.all([
        //    Categoria.destroy({where: {}, truncate: true}),
        //    Precio.destroy({where: {}, truncate: true})
        //])
        await db.sync({force:true})
        console.log('Datos eliminados correctamente')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1) 
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}


if(process.argv[2] === "-e"){
    eliminarDatos();
}