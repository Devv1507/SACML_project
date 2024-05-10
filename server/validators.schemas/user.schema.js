const {z} = require('zod');

const userSchema = z.object({
    name: z.string({
        required_error: 'El nombre de la cuenta es requerido'
    }),
    phone: z.number({
        required_error: 'El número de celular es requerido'
    }).optional()
});

module.exports = {
    userSchema, 
};