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
        const user = await models.Account.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        const token = jwt.sign(
          { email: user.email, accountId: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: '1800m' }
        );
        return done(null, user, { token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;