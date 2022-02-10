var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post("/asdf", (req, res) => {
//   const {id, title} = req.body;
// })

router.get('/home/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  const data = { categories };
  res.json(data);
});

router.get('/districts', async (req, res) => {
  const districts = await prisma.district.findMany();
  const data = { districts };
  res.json(data);
});

router.get('/home/:page', async (req, res) => {
  const page = req.params.page;

  const reviews = await prisma.table_review.findMany({
    where: {
      action: 'write',
    },
    orderBy: {
      create_at: 'desc',
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
    skip: (page - 1) * 16,
    take: page * 16,
  });

  const data = { reviews };
  res.json(data);
});

// router.get('/home/trends', async (req, res) => {
//   const trends = await prisma.restaurant.findMany({
//     where: {
//       restaurant_rating: {
//         gt: 4,
//       },
//     },
//     take: 4,
//   });

//   const data = trends;
//   res.json(data);
// });

router.get('/home/trends', async (req, res) => {
  const trends = await prisma.table_trend.findMany({
    include: {
      restaurant: true
    }
  });

  const data = trends;
  res.json(data);
});

router.get('/home/categories/:category_id/', async (req, res) => {
  const id = req.params.category_id;
  const page = req.params.page ? 1 : Math.abs(Number(req.params.page));

  const reviewsList = await prisma.category.findUnique({
    where: {
      category_id: id,
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

  reviewsList['reviews'] = reviewsList['review'];
  delete reviewsList['review'];

  reviewsList.reviews.forEach((rv) => {
    const user = rv.table_review[0].users;
    const rvTemp = rv;
    rv['users'] = user;
    rv['create_at'] = rv.table_review.create_at;

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

  res.json(reviewsList);
});

module.exports = router;
