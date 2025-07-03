import * as userRepository from './userRepository.js'
import { generateConfirmationToken, generateAccessToken } from './helpers/tokens.js'
import { sendConfirmationEmail, sendResetPasswordEmail } from './helpers/emails.js'
import bcrypt from 'bcrypt'

export const registerUser = async (body) =>{
    const {name, email, password} = body
    const userExist = await userRepository.getUserByEmail(email)
    if(userExist){
         const error = new Error('El usuario ya esta registrado')
         error.status = 409
         throw error

    }
    try {

        const confirmationToken = generateConfirmationToken()
        const user = await userRepository.registerUser(name, email, password, confirmationToken);

        sendConfirmationEmail(
            {
                name: user.name,
                email: user.email,
                token: user.token
            }
        )
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

export const confirmUser = async (token) =>{

    const user = await userRepository.getUserByToken(token);

    if(!user){
        throw new Error('Error al confirmar tu cuenta')
    }

    user.token = null;
    user.is_confirmed = true;

    await userRepository.updateUser(user)
}

export const authenticateUser = async (body) =>{

    const {email, password} = body

    const user = await userRepository.getUserByEmail(email)

    if(!user){
         const error = new Error('Credenciales inválidas')
         error.status = 401
         throw error
    }

    if(!user.is_confirmed){
        const error = new Error('El usuario no esta confirmado')
        error.status = 403
        throw error
    }
    const isPasswordValid = await user.verifyPassword(password);
    if(!isPasswordValid){
        const error = new Error('Password incorrecta')
        error.status = 401
        throw error
    }

    const token = generateAccessToken(user)


    return token



}

export const requestPasswordReset  = async (email) =>{
    const userExist = await userRepository.getUserByEmail(email)
    if(!userExist){
        throw new Error('El usuario no esta registrado')
    }

    try {
        const newToken = generateConfirmationToken()
        userExist.token = newToken
        await userRepository.updateUser(userExist)

        sendResetPasswordEmail({name: userExist.name, email: userExist.email, token: userExist.token})

    } catch (error) {
        throw error
    }


}

export const setNewPassword  = async (token, password) =>{
    const user = await userRepository.getUserByToken(token)
    if(!user){
        // No revelo si el email existe por seguridad
        throw new Error('El token no es valido')
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(password, salt);
    user.token = null
    await userRepository.updateUser(user)
}