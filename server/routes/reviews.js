const express = require('express');
const router = express.Router();
const bcrypt = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const { v4: IdRender } = require('uuid');
const passport = require('../config/passport');

const prisma = new PrismaClient();

// return one review
router.get('/:review_id', async (req, res) => {
  const review_id = req.params.review_id;

  const reviewItem = await prisma.table_review.findUnique({
    where: {
      review_id: review_id,
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
          avatar: true,
          user_id: true,
        },
      },
    },
  });

  res.json(reviewItem);
});

module.exports = router;
