const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid');
const passport = require('../config/passport');

const prisma = new PrismaClient();

/* GET users listing. */
// get all user in users table
router.get('/', async function (req, res) {
  if (req.isUnauthenticated()) {
    res.json({ message: 'hello' });
  } else {
    const user = req.user;
    res.json({ user });
  }
});

// sign in with user in database use passport
router.post(
  '/signin',
  passport.authenticate('local.signin', {
    successRedirect: '/users/',
    failureRedirect: '/users/',
  })
);

router.post('/logout', (req, res) => {
  console.log(req.isAuthenticated());
  req.logout();
  res.json('OK');
});

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/users/',
    failureRedirect: '/users/',
  })
);

router.get(
  '/signin/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/signin/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000',
  })
);
// authenticate with facebook
router.get('/signin/facebook', passport.authenticate('facebook'));
router.get(
  '/signin/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000',
  })
);
// sign out
router.get('/signout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
  }
  res.json({ user: req.user });
});
router.get('/account/:username', async (req, res) => {
  // if (req.isAuthenticated()) {
  console.log(req.isAuthenticated());
  let username = req.params.username;
  let user = await prisma.users.findMany({
    where: {
      username: username,
    },
  });

  res.json(user[0]);
});

router.get('/likedReviews/:user_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.params.user_id;

  const likedReviews = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      action: 'liked',
    },
    include: {
      review: true,
      users: true,
    },
  });

  // console.log(likedReviews);

  res.json(likedReviews);
});

router.get('/savedReviews/:user_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.params.user_id;

  // const savedReviews = await prisma.table_review.findMany({
  //   where: {
  //     user_id: user_id,
  //     action: 'saved',
  //   },
  //   include: {
  //     review: true,
  //     users: true,
  //   },
  // });

  const savedReviews = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      action: 'saved',
    },
    include: {
      review: {
        include: {
          table_review: {
            where: {
              action: 'write',
            },
            include: {
              users: true,
            },
          },
        },
      },
    },
  });

  savedReviews.forEach((rv) => {
    const user = rv.review.table_review[0].users;
    const rvTemp = rv;
    rv['users'] = user;
    rv['create_at'] = rv.review.table_review[0].create_at;

    delete rv.review.table_review;
  });

  res.json(savedReviews);
});

router.get('/likedReviewsArray/:user_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.params.user_id;

  const likedReviews = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      action: 'liked',
    },
  });
  // console.log(likedReviews);

  res.json(likedReviews);
});

router.get('/savedReviewsArray/:user_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.params.user_id;

  const savedReviews = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      action: 'saved',
    },
  });

  res.json(savedReviews);
});

router.get('/myReviews/:user_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.params.user_id;

  const myReviews = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      action: 'write',
    },
    include: {
      review: true,
      users: true,
    },
  });

  res.json(myReviews);
});

router.get('/avatar/:id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const userId = req.params.id;
  const avatar = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      avatar: true,
    },
  });

  res.json(avatar);
});

router.post('/like/:review_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.body.user_id;
  const review_id = req.params.review_id;

  console.log(user_id);
  console.log(review_id);

  const review = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      review_id: review_id,
      action: 'liked',
    },
  });

  if (review.length == 0) {
    let newRecord = await prisma.table_review.create({
      data: {
        user_id: user_id,
        review_id: review_id,
        action: 'liked',
      },
    });

    let review = await prisma.review.findUnique({
      where: {
        review_id: review_id,
      },
    });

    let newLikes = review.likes + 1;
    await prisma.review.update({
      where: {
        review_id: review_id,
      },
      data: {
        likes: newLikes,
      },
    });

    // res.json({ message: 'liked', user_id, review_id });
    res.json(newRecord);
  } else {
    res.json({ message: 'failed', user_id, review_id });
  }
});

router.post('/removelike/:review_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.body.user_id;
  const review_id = req.params.review_id;

  const review = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      review_id: review_id,
      action: 'liked',
    },
  });

  if (review.length != 0) {
    let table_id = review[0].table_id;

    await prisma.table_review.delete({
      where: {
        table_id: table_id,
      },
    });

    let unlikedReview = await prisma.review.findUnique({
      where: {
        review_id: review_id,
      },
    });

    let newLikes = unlikedReview.likes - 1;
    await prisma.review.update({
      where: {
        review_id: review_id,
      },
      data: {
        likes: newLikes,
      },
    });

    // res.json({ message: 'removed like', user_id, review_id });
    res.json(review[0]);
  } else {
    res.json({ message: 'removed like failed', user_id, review_id });
  }
});

router.post('/save/:review_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.body.user_id;
  const review_id = req.params.review_id;

  const review = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      review_id: review_id,
      action: 'saved',
    },
  });

  if (review.length == 0) {
    let savedReview = await prisma.table_review.create({
      data: {
        user_id: user_id,
        review_id: review_id,
        action: 'saved',
      },
    });
    // res.json({ message: 'saved', user_id, review_id });
    res.json(savedReview);
  } else {
    res.json({ message: 'already saved', user_id, review_id });
  }
});

router.post('/unsave/:review_id', async (req, res) => {
  // if (req.isAuthenticated()) {

  const user_id = req.body.user_id;
  const review_id = req.params.review_id;

  const review = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      review_id: review_id,
      action: 'saved',
    },
  });

  if (review.length != 0) {
    await prisma.table_review.delete({
      where: {
        table_id: review[0].table_id,
      },
    });
    // res.json('unsaved');
    res.json(review[0]);
  } else {
    res.json('Failed to unsave');
  }
});

router.post('/deleteReview/:review_id', async (req, res) => {
  // if (req.isAuthenticated()) {
  const user_id = req.user.user_id;
  const review_id = req.params.review_id;

  const review = await prisma.table_review.findMany({
    where: {
      user_id: user_id,
      review_id: review_id,
      action: 'write',
    },
  });

  if (review.length != 0) {
    await prisma.table_review.deleteMany({
      where: {
        user_id: user_id,
        review_id: review_id,
        action: 'write',
      },
    });

    const deletedReview = await prisma.review.delete({
      where: {
        review_id: review_id,
      },
    });

    await prisma.table_image.deleteMany({
      where: {
        review_id: review_id,
      },
    });

    res.json('deleted');
  } else {
    res.json('Failed to delete');
  }
});

router.post('/changeInfo', async (req, res) => {
  const { user_id, displayName, phone_number, email, avatar } = req.body;

  // console.log('hello' + user_id);

  const user = await prisma.users.update({
    where: {
      user_id: user_id,
    },
    data: {
      displayName: displayName,
      phone_number: phone_number,
      email: email,
      avatar: avatar,
    },
  });

  res.json(user);
});

router.post('/changePassword', async (req, res) => {
  const { user_id, oldPassowrd, newPassword } = req.body;

  const user = await prisma.users.findUnique({});

  const truePass = bcrypt.compareSync(oldPassowrd, user.password);

  if (truePass) {
    const hashedPass = bcrypt.hashSync(newPassword, 12);

    const user = await prisma.users.update({
      where: {
        user_id: user_id,
      },
      data: {
        password: hashedPass,
      },
    });

    res.json(user);
  } else {
    res.json({ message: 'Wrong password' });
  }
});

router.post('/postReview', async (req, res) => {
  if (req.isAuthenticated()) {
    const {
      user_id,
      images,
      title,
      description,
      ambience,
      food,
      service,
      price,
      overall,
      restaurant_id,
      category_id,
    } = req.body;

    // let user_id = req.user.user_id;
    console.log(images);
    let review_image = images[0] ? images[0] : '';

    let review_id = IdRender();
    let alias = IdRender();

    const newPost = await prisma.review.create({
      data: {
        review_id: review_id,
        review_image: review_image,
        review_alias_link: alias,
        title: title,
        description: `${description}`,
        user_rating: Number(overall) * 2,
        ambience: Number(ambience) * 2,
        food: Number(food) * 2,
        service: Number(service) * 2,
        price: Number(price) * 2,
        restaurant_id: restaurant_id,
        category_id: category_id,
      },
    });

    await prisma.table_review.create({
      data: {
        user_id: user_id,
        review_id: review_id,
        action: 'write',
      },
    });

    await Promise.all(
      images.map(async (image) => {
        await prisma.table_image.create({
          data: {
            review_id: review_id,
            image_link: image,
          },
        });
      })
    );

    res.json(newPost);
  } else {
    res.json({ message: 'Have not loged in yet' });
  }
});

router.post('/editReview/:review_id', async (req, res) => {
  if (req.isAuthenticated()) {
    const review_id = req.params.review_id;

    const {
      user_id,
      images,
      title,
      description,
      ambience,
      food,
      service,
      price,
      overall,
      restaurant_id,
      category_id,
    } = req.body;

    let review_image = images[0] ? images[0] : '';

    const editedPost = await prisma.review.update({
      where: {
        review_id: review_id,
      },
      data: {
        review_id: review_id,
        review_image: review_image,
        review_alias_link: alias,
        title: title,
        description: `${description}`,
        user_rating: Number(overall) * 2,
        ambience: Number(ambience) * 2,
        food: Number(food) * 2,
        service: Number(service) * 2,
        price: Number(price) * 2,
        restaurant_id: restaurant_id,
        category_id: category_id,
      },
    });

    await prisma.table_image.deleteMany({
      where: {
        review_id: review_id,
      },
    });

    await Promise.all(
      images.map(async (image) => {
        await prisma.table_image.create({
          data: {
            review_id: review_id,
            image_link: image,
          },
        });
      })
    );

    res.json(editedPost);
  } else {
    res.json({ message: 'Have not loged in yet' });
  }
});

router.post('/createRestaurant', async (req, res) => {
  const {
    user_id,
    restaurant_name,
    restaurant_image,
    phoneNumber,
    openingTime,
    address,
    district_id,
  } = req.body;

  let address_id = IdRender();
  let restaurant_id = IdRender();
  let alias = IdRender();

  await prisma.address.create({
    data: {
      address_id: address_id,
      address: `${address}`,
      district_id: district_id,
    },
  });

  const newRestaurant = await prisma.restaurant.create({
    data: {
      address_id: address_id,
      restaurant_id: restaurant_id,
      restaurant_image: `${restaurant_image}`,
      restaurant_name: `${restaurant_name}`,
      restaurant_alias_link: alias,
      phoneNumber: `${phoneNumber}`,
      openingTime: `${openingTime}`,
    },
  });

  res.json(newRestaurant);
});

router.get('/:review_id', async (req, res) => {
  const review_id = req.params.review_id;

  const reviewItem = await prisma.table_review.findUnique({
    where: {
      review_id: review_id,
    },
    include: {
      review: {
        select: {
          review_id: true,
          title: true,
          likes: true,
          description: true,
          review_image: true,
        },
      },
      users: {
        select: {
          username: true,
          displayName: true,
          avatar: true,
          user_id: true,
        },
      },
    },
  });

  res.json(reviewItem);
});

router.post('/comment', async (req, res) => {
  if (req.isAuthenticated()) {
    const { review_id, comment_content } = req.body;

    // let comment_id = IdRender();

    let comment = await prisma.comments.create({
      data: {
        // comment_id: comment_id,
        comment_content: comment_content,
        user_id: req.user.user_id,
        review_id: review_id,
      },
    });

    res.json(comment);
  } else {
    res.json({ message: 'Have not loged in yet' });
  }
});

module.exports = router;
