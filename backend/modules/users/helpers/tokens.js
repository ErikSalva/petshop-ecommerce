import crypto from 'crypto';
import jwt from 'jsonwebtoken'

export const generateConfirmationToken = () => {
    return crypto.randomBytes(32).toString('hex')
}

export const generateAccessToken = (user) =>{
    
    return jwt.sign({id: user.id, name: user.name, role: user.role, email: user.email}, process.env.JWT_SECRET, {expiresIn:'1d'})
}