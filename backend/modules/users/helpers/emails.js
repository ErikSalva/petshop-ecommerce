import nodemailer from 'nodemailer'

const sendConfirmationEmail = async (data) =>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // gmail, hotmail
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER, // usuario de la cuenta
            pass: process.env.EMAIL_PASS, // app password no la real
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const { name, email, token } = data

    // Enviar el email
    await transport.sendMail({

        from: `Ecommerce.com <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Confirma tu cuenta en Ecommerce.com',
        text:'Confirma tu cuenta en Ecommerce.com',
        html: `
        
            <p>¡Hola ${name}!</p>
            <p>Gracias por registrarte en Ecommerce.com.</p>
            <p>Tu cuenta ya está lista, solo te falta confirmarla. Para eso, hacé clic en el siguiente enlace:</p>
            <p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm/${token}">
                    Confirmar cuenta
                </a>
            </p>
            <p>Si no fuiste vos quien creó esta cuenta, podés ignorar este mail sin problema.</p>

        `

    })

}

const sendResetPasswordEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const { name, email, token } = data;

    // Enviar el email
    await transport.sendMail({
        from: `Ecommerce.com <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Restablece tu contraseña en Ecommerce.com',
        text: 'Restablece tu contraseña en Ecommerce.com',
        html: `
            <p>¡Hola ${name}!</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Ecommerce.com.</p>
            <p>Para crear una nueva contraseña, haz clic en el siguiente enlace:</p>
            <p>
                <a href="${process.env.FRONTEND_URL}/auth/reset-password/${token}">
                    Restablecer contraseña
                </a>
            </p>
        `
    });
};

export{
    sendConfirmationEmail,
    sendResetPasswordEmail
}