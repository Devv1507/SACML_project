const {z} = require('zod');

const registerSchema = z.object({
    name: z.string({
        required_error: 'El nombre de la cuenta es requerido'
    }),
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        required_error: 'Correo inválido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        required_error: 'La contraseña debe ser de mínimo 6 carácteres'
    }),
    rePassword: z.string({
        required_error: 'La contraseña de verificación es requerida'
    })
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        required_error: 'Correo inválido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        required_error: 'La contraseña debe ser de mínimo 6 carácteres'
    })
});

module.exports = {
    registerSchema, 
    loginSchema
};