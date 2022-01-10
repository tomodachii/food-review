const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid');
const passport = require('../config/passport');

const prisma = new PrismaClient();

router.get('/:restaurant_id', async (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_id: restaurant_id,
    },
    include: {
      review: {
        include: {
          table_review: {
            include: {
              users: true,
            },
          },
        },
      },
      address: true,
    },
  });

  // restaurants.forEach((item) => {
  //   let user2 = [];
  //   let review2 = [];

  //   for (let i = 0; i < item.review.length; i++) {
  //     review2[i] = item.review[i];
  //     user2[i] = review2[i].table_review[0].users;
  //     review2[i].users = user2[i];
  //     review2[i].create_at = review2[i].table_review[0].create_at;

  //     delete item.review;
  //     delete review2[i].table_review;
  //     item['review'] = review2;
  //   }
  // });

  restaurants[0].review.forEach((rv) => {
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
  // let data = { restaurants[0] };
  res.json(restaurants[0]);
});

router.get('/images/:restaurant_id', async (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_id: restaurant_id,
    },
    include: {
      review: {
        include: {
          table_image: true,
        },
      },
    },
  });

  restaurants.forEach((item) => {
    let review2 = [];
    let length = item.review.length;
    for (let i = 0; i < length; i++) {
      review2[i] = item.review[i].table_image;
      delete item.review[i];
      item['image'] = review2;
    }

    // item.review.forEach(rv)
  });

  res.json(restaurants[0]);
});

router.get('/', async (req, res) => {
  let restaurants = await prisma.restaurant.findMany({
    include: {
      review: {
        include: {
          table_review: {
            include: {
              users: true,
            },
          },
        },
      },
      address: true,
    },
  });

  restaurants.forEach((item) => {
    let user2 = [];
    let review2 = [];

    for (let i = 0; i < item.review.length; i++) {
      review2[i] = item.review[i];
      user2[i] = review2[i].table_review[0].users;
      review2[i].users = user2[i];
      review2[i].create_at = review2[i].table_review[0].create_at;

      delete item.review;
      delete review2[i].table_review;
      item['review'] = review2;
    }
  });

  res.json(restaurants);
});

router.get('/:district', async (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_id: restaurant_id,
    },
    include: {
      review: {
        include: {
          table_review: {
            include: {
              users: true,
            },
          },
        },
      },
      address: true,
    },
  });

  restaurants[0].review.forEach((rv) => {
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
  // let data = { restaurants[0] };
  res.json(restaurants[0]);
});

module.exports = router;
