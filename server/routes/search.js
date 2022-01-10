const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid');
const passport = require('../config/passport');

const prisma = new PrismaClient();

router.get('/reviews/:key', async (req, res) => {
  const key = req.params.key;

  let reviews = await prisma.review.findMany({
    where: {
      title: { contains: key },
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

router.get('/users/:key', async (req, res) => {
  const key = req.params.key;

  let users = await prisma.users.findMany({
    where: {
      username: { contains: key },
    },
  });

  let data = { users };
  res.json(data);
});

router.get('/restaurants/:key', async (req, res) => {
  const key = req.params.key;

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_name: { contains: key },
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

  restaurants.forEach((item) => {
    let user2 = [];
    let review2 = [];

    for (let i = 0; i < item.review.length; i++) {
      if (i < 2 && item.review[i] != null) {
        review2[i] = item.review[i];
        user2[i] = review2[i].table_review[0].users;
        review2[i].users = user2[i];
        review2[i].create_at = review2[i].table_review[0].create_at;

        delete item.review;
        delete review2[i].table_review;
        item['review'] = review2;
      }
    }
  });

  let data = { restaurants };
  res.json(data);
});

router.get('/reviews/:key', async (req, res) => {
  const key = req.params.key;

  let reviews = await prisma.review.findMany({
    where: {
      title: { contains: key },
    },
  });

  let data = { reviews };
  res.json(data);
});

router.get('/all/:key', async (req, res) => {
  const key = req.params.key;

  let users = await prisma.users.findMany({
    where: {
      username: { contains: key },
    },
    take: 2,
  });

  let reviews = await prisma.review.findMany({
    where: {
      title: { contains: key },
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

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_name: { contains: key },
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

  restaurants.forEach((item) => {
    let user2 = [];
    let review2 = [];

    for (let i = 0; i < item.review.length; i++) {
      if (i < 2 && item.review[i] != null) {
        review2[i] = item.review[i];
        user2[i] = review2[i].table_review[0].users;
        review2[i].users = user2[i];
        review2[i].create_at = review2[i].table_review[0].create_at;

        delete item.review;
        delete review2[i].table_review;
        item['review'] = review2;
      }
    }
  });

  // let data = { restaurants };

  res.json({ users, restaurants, reviews });
});

module.exports = router;
