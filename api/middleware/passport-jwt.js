const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const models = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      return token;
    }
  ]),
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const account = await models.Account.findOne({
        where: { email: jwt_payload.email },
        attributes: {
          exclude: ['password'],
        }
      });
      if (account) return done(null, account);
      return done(null, false, {message: 'Not account found'});
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
