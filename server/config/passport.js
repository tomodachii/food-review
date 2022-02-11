const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('./bcrypt');

const keys = require('./key');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// passport local

passport.use(
  'local.signin',
  new LocalStrategy(async function (username, password, done) {
    let user = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      const truePass = bcrypt.compareSync(password, user.password);
      if (truePass) return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

passport.use(
  'local.signup',
  new LocalStrategy(async function (username, password, done) {
    let user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      const hashedPass = bcrypt.hashSync(password, 12);
      let newUser = await prisma.users.create({
        data: {
          username,
          password: hashedPass,
          displayName: username,
        },
      });

      if (newUser) {
        return done(null, newUser);
      } else {
        return done(null, false);
      }
    } else {
      return done(null, false);
    }
  })
);

// passport Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.id,
      clientSecret: keys.facebook.secret,
      callbackURL: '/users/signin/facebook/callback',
      profileFields: ['email', 'displayName', 'id', 'photos'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await prisma.users.findUnique({
          where: {
            user_id: profile.id,
          },
        });
        if (user) {
          return done(null, user);
        } else {
          try {
            const newUser = await prisma.users.create({
              data: {
                user_id: profile.id,
                username: profile.displayName,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : '',
                password: '',
                avatar: profile.photos[0].value,
                phone_number: '',
                role: 0,
                provider: 'Facebook',
              },
            });
            if (newUser) {
              return done(null, newUser);
            } else {
              return done(null, false);
            }
          } catch (err) {
            return done(err, false);
          }
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// passport google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.id,
      clientSecret: keys.google.secret,
      callbackURL: '/users/signin/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await prisma.users.findFirst({
          where: {
            user_id: profile.id,
          },
        });
        if (user) {
          return done(null, user);
        } else {
          try {
            const newUser = await prisma.users.create({
              data: {
                user_id: profile.id,
                username: profile.displayName,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : '',
                password: '',
                avatar: profile.photos[0].value,
                phone_number: '',
                role: 0,
                provider: 'Google',
              },
            });
            if (newUser) {
              return done(null, newUser);
            } else {
              return done(null, false);
            }
          } catch (err) {
            return done(err, false);
          }
          // console.log(profile);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function (user_id, done) {
  try {
    const authUser = await prisma.users.findFirst({
      where: {
        user_id,
      },
    });
    if (authUser) {
      done(null, authUser);
      return;
    } else {
      done(null, false);
    }
  } catch (err) {
    done(null, false);
  }
});

module.exports = passport;
