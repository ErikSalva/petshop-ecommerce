import express from 'express'
import db from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

import indexRoutes from './routes/index.js'


const app = express()

const allowedOrigins = process.env.CORS_ORIGINS.split(',');

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // para peticiones sin origin (Postman, curl)
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));
// Este middleware permite que Express pueda leer y procesar datos en formato JSON.
// Es necesario cuando el frontend envía datos con Content-Type: 'application/json',
// como por ejemplo usando fetch o axios con un body JSON.
// Si no lo tenés, req.body será undefined en esas solicitudes.
app.use(express.json());

// Este middleware permite que Express procese datos enviados desde formularios HTML
// tradicionales (Content-Type: 'application/x-www-form-urlencoded').
// Es útil cuando se envían formularios sin archivos, por ejemplo con método POST.
// Si no lo tenés, req.body también será undefined en esos casos.
app.use(express.urlencoded({ extended: true })); // extended: true permite parsear objetos anidados


// Habilita cookie-parser permite leer los req.cookies
app.use( cookieParser())


// Definir un puerto y arrancar el proyecto
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000


try {
    await db.authenticate();
    db.sync()
    console.log('conexion exitosa a la BD')
} catch (error) {
    console.error(error)
    
}


//Carpeta publca
app.use(express.static('uploads'))

// Rutas
app.use(indexRoutes)

// Middleware para los errores
app.use(errorHandler);


app.listen(port, host, ()=>{
    console.log(`El servidor esta corriendo correctamente en el puerto ${port}`)
});
