    import express from 'express'
    import { registerUser, authenticateUser, logoutUser, confirmUser, resetPassword, newPassword} from './userController.js';
    import { validateUserInput } from './middleware/userValidations.js';
    import { validateLoginInput, validateForgotPasswordInput, validateResetPasswordInput } from './middleware/loginValidations.js';
    import authenticateToken from '../../middleware/auth.js';
    
    const router = express.Router();

    router.post('/register', validateUserInput, registerUser);

    router.post('/login', validateLoginInput, authenticateUser);

    router.post('/logout',authenticateToken, logoutUser);

    router.get('/confirm/:token', confirmUser);

    // Verifico que el usuario este autenticado y obtengo los datos del usuario
    router.get('/me', authenticateToken, (req, res) => {
        res.json({ user: req.user });
    });
    router.post('/forgot-password', validateForgotPasswordInput, resetPassword);
    
    router.post('/forgot-password/:token', validateResetPasswordInput, newPassword);

    
    export default router