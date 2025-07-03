
import * as userRepository from '../modules/users/userRepository.js'
import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) =>{

    const token = req.cookies._auth;

    if(!token){
        const error = new Error('No autenticado')
        error.statusCode=401
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // No trae el password porque el modelo de User lo excluye
        const user = await userRepository.getUserById(decoded.id)
        
        if(!user){
            // Limpiar cookie si el usuario no existe
            res.clearCookie('_auth');
            const error = new Error('Usuario no existe o fue eliminado');
            error.statusCode = 401;
            return next(error);
        }

        req.user = user
        next()
    } catch (error) {
        res.clearCookie('_auth');
        error.statusCode = 401;
        error.message = 'Token inválido o expirado';
        next(error)
    }
}

export default authenticateToken