var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post("/asdf", (req, res) => {
//   const {id, title} = req.body;
// })

router.get('/home/:page', async (req, res) => {
  const page = req.params.page ? 1:Math.abs(Number(req.params.page));
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
          reivew_image: true,
        },
      },
      users: {

      }
    },
    skip: (page-1)*30,
    take: 30,
  });

  const trends = await prisma.restaurant.findMany({
    where: {
      restaurant_rating: {
        gt: 4
      }
    },
    take: 5,
  })

  const data = {categories, reviews, trends};
  res.json(data);
});

router.get('/test/create', async (req, res) => {
  const categories = await prisma.category.findMany();
  // console.log(categories);
  const restaurants = await prisma.restaurant.findMany();

  const data = {categories, restaurants};
  res.json(data);
});


module.exports = router;
