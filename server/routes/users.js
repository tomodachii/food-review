const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid')
const passport = require('../config/passport')

const prisma = new PrismaClient()


/* GET users listing. */
// get all user in users table
router.get('/', async function(req, res, next) {
  // only superuser can use
  if (req.isUnauthenticated() || req.user?.role != 0) {
    res.json({users: null, message: "Access is denied"})
    return
  }

  // if superuser
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch {
    res.json({users: null, message: "Get data from users table failed"});
  }
});

// sign in with user in database use passport
router.post('/signin', (req, res) => {
  // if authenticated then can't access
  if (req.isAuthenticated()) {
    res.json({user: req.user})
    return
  }

  passport.authenticate('local', {session: true}, (err, user, info) => {
    if (user) {
      return res.json({user: user})
    } else {
      return res.json({user: null, message: 'Authenticate user failed'})
    }
  })(req, res)
})

router.post('/signup', async (req, res) => {
  // if authenticated then can't access
  if (req.isAuthenticated()) {
    res.json(req.user)
    return
  }

  try {
    // check if username is existed in database
    const userTemp = await prisma.users.findFirst({
      where: {
        username: req.body.username
      }
    })
    if (userTemp) {
      res.json({user: null, message: 'Username is existed'})
      return
    }
  } catch {
    res.json({user: null, message: 'Authentication sign-up failed'})
    return
  }

  try {
    // create hash for password and store to database
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    try {
      const user = await prisma.users.create({
        data: {
          user_id: IdRender(),
          username: req.body.username,
          password: hashPassword,
          email: "",
          phone_number: "",
          avatar: "",
          provider: ""
        }
      })
      // check created success
      // but unauthenticate
      if (user) {
        res.json({user, message: "Go login!!!"})
        return
      }
    } catch {
      res.send({user: null, message: 'Signup-failed'});
    }
  } catch {
    res.send({user: null, message: 'Hash password failed'})
    return;
  }
});

router.get('/person/:id', async (req, res) => {
  // if (req.isAuthenticated()) {
    const userId = req.params.id;
    const reviews = await prisma.table_review.findMany({
      include: {
        review: {
          select: {
            review_id: true,
            title: true,
            
          }
        },
        users: true,
      },
      where: {
        user_id: userId,
        action: 'write',

      }
    })
    const data = {reviews}
    res.json(data)
  // } else {
  //   res.json(null);
  // }
})

// auth with facebook
router.get('/signin/facebook', passport.authenticate('facebook'));
router.get('/signin/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' })
);

// auth with google
router.get('/signin/google',passport.authenticate('google', 
  { scope: [ 'email', 'profile' ] }
));
router.get('/signin/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' })
);


// sign out
router.get('/signout', (req, res) => {
  if (req.isAuthenticated()){
    req.logOut()
  }
  res.json({user: req.user}) 
})
module.exports = router;
