var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home/:page', async (req, res) => {
  const page = req.params.page ? 1:Math.abs(Number(req.params.page));
  const categories = await prisma.category.findMany();
  // console.log(categories);
  const restaurants = await prisma.restaurant.findMany({
    skip: (page-1)*50,
    take: 50,
  });

  const trends = await prisma.restaurant.findMany({
    where: {
      rating: {
        gt: 4
      }
    },
    take: 5,
  })

  const data = {categories, restaurants, trends};
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
