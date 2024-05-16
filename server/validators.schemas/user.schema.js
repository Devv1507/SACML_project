const {z} = require('zod');

const userSchema = z.object({
    name: z.string({
        required_error: 'El nombre de la cuenta es requerido'
    }),
    phone: z.string({
        required_error: 'El número de celular es requerido',
      }).refine((val) => /^\d+$/.test(val), {
        message: 'El número de celular debe contener solo dígitos',
      }).optional()
});

module.exports = {
    userSchema, 
};