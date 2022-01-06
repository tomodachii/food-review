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

router.get('/home/:page', async (req, res) => {
  const page = req.params.page ? 1 : Math.abs(Number(req.params.page));

  const reviews = await prisma.table_review.findMany({
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
          avatar: true,
          user_id: true,
        },
      },
    },
    skip: (page - 1) * 16,
    take: 16,
  });

  const data = { reviews };
  res.json(data);
});

router.get('/home/trends', async (req, res) => {
  const trends = await prisma.restaurant.findMany({
    where: {
      restaurant_rating: {
        gt: 4,
      },
    },
    take: 4,
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
    const user = rv.table_review.users;
    delete rv.table_review;
    const rvTemp = rv;
    rv['users'] = user;

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
  });

  // let list = [];
  // for (let i = 0; i < page * 16; i++) {
  //   list.push(reviewsList.reviews[i]);
  // }

  // const data = { reviewsList };
  res.json(reviewsList);
});

// router.get('/test/create', async (req, res) => {
//   const categories = await prisma.category.findMany();
//   // console.log(categories);
//   const restaurants = await prisma.restaurant.findMany();

//   const data = { categories, restaurants };
//   res.json(data);
// });

router.get('/search/:key', async (req, res) => {
  const key = req.params.key;

  let reviews = await prisma.review.findMany({
    where: {
      title: { contains: key },
    },
  });

  let users = await prisma.users.findMany({
    where: {
      username: { contains: key },
    },
  });

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_name: { contains: key },
    },
    include: {
      review: true,
    },
  });

  restaurants.forEach((item) => {
    let review2 = [];
    review2[0] = item.review[0];
    review2[1] = item.review[1];
    delete item.review;
    item['review'] = review2;
  });

  let data = {};
  data['reviews'] = reviews;
  data['users'] = users;
  data['restaurants'] = restaurants;

  res.json(data);
});

router.get('/search/reviews/:key', async (req, res) => {
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

  // reviewsList['reviews'] = reviewsList['review'];
  // delete reviewsList['review'];

  reviews.forEach((rv) => {
    const user = rv.table_review.users;
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

  let data = { reviews };
  res.json(data);
});

router.get('/search/users/:key', async (req, res) => {
  const key = req.params.key;

  let users = await prisma.users.findMany({
    where: {
      username: { contains: key },
    },
  });

  let data = { users };
  res.json(data);
});

router.get('/search/restaurants/:key', async (req, res) => {
  const key = req.params.key;

  let restaurants = await prisma.restaurant.findMany({
    where: {
      restaurant_name: { contains: key },
    },
    include: {
      review: true,
    },
  });

  restaurants.forEach((item) => {
    let review2 = [];
    review2[0] = item.review[0];
    review2[1] = item.review[1];
    delete item.review;
    item['review'] = review2;
  });

  let data = { restaurants };
  res.json(data);
});

router.get('/search/reviews/:key', async (req, res) => {
  const key = req.params.key;

  let reviews = await prisma.review.findMany({
    where: {
      title: { contains: key },
    },
  });

  let data = { reviews };
  res.json(data);
});

module.exports = router;
