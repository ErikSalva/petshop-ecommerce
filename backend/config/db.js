import {Sequelize}  from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: '.env'})

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS ?? '',{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true,

    },

    pool: {
        max:5,
        min:0,
        acquire: 60000,//60sg tiempo que tarda de establecer la coneccion antes de marrcar error
        idle: 10000, // si no hay visitas da 10 seg para que la conexion finalice

    },
})

export default db;
