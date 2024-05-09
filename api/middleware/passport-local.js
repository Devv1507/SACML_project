const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const models = require('../models');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const account = await models.Account.findOne({ where: { email } });
        if (!account) {
          return done(null, false, { message: 'El correo ingresado no se encuentra registrado.' });
        }
        const passwordMatch = await bcrypt.compare(password, account.password);
        if (!passwordMatch) {
          return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        const token = jwt.sign(
          { email: account.email, accountId: account.id },
          process.env.TOKEN_SECRET,
          { expiresIn: '1800m' }
        );
        return done(null, account, { token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;