const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid')
const passport = require('../config/passport')

const prisma = new PrismaClient()
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const data = await prisma.users.findMany();
    res.json(data);
  } catch {
    res.send("Get data from users table failed");
  }
});

// user local
router.post('/signin', (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (user) {
      return res.json(user)
    } else {
      return res.send('Authenticate user failed')
    }
  })(req, res)
})

router.post('/signup', async (req, res) => {
  try {
    const userTemp = await prisma.users.findFirst({
      where: {
        username: req.body.username
      }
    })
    if (userTemp) {
      res.send('Username is existed')
      return;
    }
  } catch {
    res.send('Authentication sign-up failed')
  }

  try {
    const user = await prisma.users.create({
      data: {
        user_id: IdRender(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone_number: req.body.phone,
        avatar: "",
        provider: ""
      }
    })
    if (user) {
      res.json(user)
      return
    }
  } catch {
    res.send('Sign-failed');
  }
})

// auth with facebook
router.get('/signin/facebook', passport.authenticate('facebook'));

router.get('/signin/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' })
);

// auth with google
router.get('/signin/google',passport.authenticate('google', 
  { scope:
    [ 'email', 'profile' ]
  }
));

router.get( '/signin/google/callback',
  passport.authenticate( 'google', { successRedirect: '/', failureRedirect: '/' }
));

module.exports = router;
