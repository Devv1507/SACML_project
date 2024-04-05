const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const models = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    try {
      const account = models.Account.findOne(
        (account) => account.email === jwt_payload.email
      );
      if (account) return done(null, account);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
