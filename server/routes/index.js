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

router.get('/home/:page', async (req, res) => {
  const page = req.params.page ? 1 : Math.abs(Number(req.params.page));
  const categories = await prisma.category.findMany();
  // console.log(categories);
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

  const trends = await prisma.restaurant.findMany({
    where: {
      restaurant_rating: {
        gt: 4,
      },
    },
    take: 4,
  });

  const data = { categories, reviews, trends };
  // const data = { reviews, trends };

  res.json(data);
});

router.get('/test/create', async (req, res) => {
  const categories = await prisma.category.findMany();
  // console.log(categories);
  const restaurants = await prisma.restaurant.findMany();

  const data = { categories, restaurants };
  res.json(data);
});

module.exports = router;
