import { validationResult } from "express-validator"
import * as userService from './userService.js'

const registerUser = async (req, res, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Errores de validación'); 
        err.status = 400;
        err.details = errors.array();
        return next(err);
    }
    try {
        await userService.registerUser(req.body)
        res.status(201).json({message: 'Usuario registrado correctamente'})
    } catch (error) {
        next(error)
    }


}

const authenticateUser = async (req, res, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Errores de validación'); 
        err.status = 400;
        err.details = errors.array();
        return next(err);
    }
    try {
        const token = await userService.authenticateUser(req.body)
        res.cookie('_auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24, // 1 dia de duracion del token
        });
        res.json({message: 'Autenticado correctamente'})
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next) =>{
    try {
        res.clearCookie('_auth');
        res.json({ mensaje: 'Sesión cerrada' });
    } catch (error) {
        next(error);
    }
}

const confirmUser = async (req, res, next) =>{
    const {token} = req.params
    try {
        await userService.confirmUser(token);
        res.status(200).json({ message: 'Cuenta confirmada con éxito' });
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Errores de validación'); 
        err.status = 400;
        err.details = errors.array();
        return next(err);
    }

    
    try {
        const{email} = req.body
        await userService.requestPasswordReset (email)
        res.status(200).json({ message: 'Si el email existe, recibirás un enlace para resetear tu contraseña' });
    } catch (error) {
        next(error)
    }
}

const newPassword = async (req, res, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Errores de validación'); 
        err.status = 400;
        err.details = errors.array();
        return next(err);
    }
    
    
    try {
        const{token} = req.params
        const{password} = req.body
        await userService.setNewPassword (token, password)
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        next(error)
    }
}

export{
    registerUser,
    authenticateUser,
    logoutUser,
    confirmUser,
    newPassword,
    resetPassword,
}