const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

const keys = require('./key');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// passport local
passport.use(new LocalStrategy(
  async (username, password, done) => {
  try {
    const UserRecord = await prisma.users.findFirst({
      where: {
        username
      }
    })
    if (UserRecord?.password == password) return done(null, UserRecord)
    return done(null, false)
  } catch(err) {
    return done(err)
  }
}));

// passport Facebook
passport.use(new FacebookStrategy({
  clientID: keys.facebook.id,
  clientSecret: keys.facebook.secret,
  callbackURL: "http://localhost:5000/users/signin/facebook/callback",
  profileFields: ['email', 'displayName', 'id', 'photos', ]
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        user_id: profile.id
      }
    })
    if (user) {
      return done(null, user)
    } else {
      try {
        const newUser = await prisma.users.create({
          data: {
            user_id: profile.id,
            username: profile.displayName,
            email: profile.emails? profile.emails[0].value: "",
            password: "",
            avatar: profile.photos[0].value,
            phone_number: "",
            role: 0,
            provider: "Facebook"
          }
        })
        if (newUser) {
          return done(null, newUser)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  } catch(err) {
    return done(err, false)
  }
}
));

// passport google
passport.use(new GoogleStrategy({
  clientID:     keys.google.id,
  clientSecret: keys.google.secret,
  callbackURL: "http://localhost:5000/users/signin/google/callback",
  passReqToCallback   : true
},
async function(request, accessToken, refreshToken, profile, done) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        user_id: profile.id
      }
    })
    if (user) {
      return done(null, user)
    } else {
      try {
        const newUser = await prisma.users.create({
          data: {
            user_id: profile.id,
            username: profile.displayName,
            email: profile.emails? profile.emails[0].value: "",
            password: "",
            avatar: profile.photos[0].value,
            phone_number: "",
            role: 0,
            provider: "Google"
          }
        })
        if (newUser) {
          return done(null, newUser)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
      // console.log(profile);
    }
  } catch(err) {
    return done(err, false)
  }
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser( async function(user, done) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username: user.username
      }
    })
    if (user) {
      done(null, user)
      return
    }

  } catch (err) {
    done(err, user);
  }
});

module.exports = passport