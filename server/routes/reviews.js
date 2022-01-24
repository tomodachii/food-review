const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid');
const passport = require('../config/passport');

const prisma = new PrismaClient();

// return one review
router.get('/:review_id/', async (req, res) => {
  const review_id = req.params.review_id;

  const reviewItem = await prisma.table_review.findMany({
    where: {
      review_id: review_id,
      action: 'write',
    },
    include: {
      review: {
        include: {
          review_id: true,
          title: true,
          likes: true,
          description: true,
          review_image: true,
          user_rating: true,
        },
        include: {
          category: {
            select: {
              category_name: true,
            },
          },
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

  res.json(reviewItem[0]);
});

router.get('/reviewImage/:review_id', async (req, res) => {
  const review_id = req.params.review_id;

  const imageList = await prisma.table_image.findMany({
    where: {
      review_id: review_id,
    },
  });

  res.json(imageList);
});

router.get('/:fromDate/:toDate', async (req, res) => {
  const key = req.params.key;
  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;

  let reviews = await prisma.review.findMany({
    where: {
      table_review: {
        some: {
          create_at: {
            gt: new Date(fromDate),
            lt: new Date(toDate),
          },
        },
      },
    },
    include: {
      table_review: {
        include: {
          users: true,
        },
      },
    },
  });

  reviews.forEach((rv) => {
    const user = rv.table_review[0].users;
    const rvTemp = rv;
    rv['users'] = user;
    rv['create_at'] = rv.table_review[0].create_at;

    rv['review'] = {
      review_id: rv.review_id,
      title: rv.title,
      description: rv.description,
      service: rv.service,
      price: rv.price,
      food: rv.food,
      ambience: rv.ambience,
      restaurant_id: rv.restaurant_id,
      category_id: rv.category_id,
      likes: rv.likes,
      review_image: rv.review_image,
      user_rating: rv.user_rating,
      create_at: rv.table_review.create,
    };
    delete rv.review_id;
    delete rv.title;
    delete rv.description;
    delete rv.service;
    delete rv.price;
    delete rv.food;
    delete rv.ambience;
    delete rv.restaurant_id;
    delete rv.category_id;
    delete rv.likes;
    delete rv.review_image;
    delete rv.user_rating;
    delete rv.table_review;
  });

  let data = { reviews };
  res.json(data);
});

module.exports = router;
