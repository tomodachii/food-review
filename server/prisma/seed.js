const { PrismaClient } = require('@prisma/client')
var faker = require('faker');

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const userData = require('../user.json');
const reviewData = require('../review.json');
const districtData = require('../district.json');
const restaurantData = require('../restaurant.json');
const categoryData = require('../category.json');
const addressData = require('../address.json');
const tableReviewData = require('../tableReview.json');


/////////////////////////////////// Seed User /////////////////////////////////////////////////

// for(let i = 0; i < userData.length; i++) {
//   userData[i].password = faker.internet.password()
//   userData[i].email = faker.internet.email()
//   userData[i].phone_number = faker.phone.phoneNumber()
//   userData[i].provider = ""
// }

// let data = userData

// async function addUserData() {
//   await prisma.users.createMany({
//     data
//   })
// }

// addUserData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////// Seed category ///////////////////////////////////////////////
// data = categoryData

// async function addCategoryData() {
//   await prisma.category.createMany({
//     data
//   })
// }

// addCategoryData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////// Seed Disdtrict ////////////////////////////////////////

// data = districtData

// async function addDistrictData() {
//   await prisma.district.createMany({
//     data
//   })
// }

// addDistrictData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////// Seed Review ////////////////////////////////////////

// data = reviewData

// async function addReviewData() {
//   await prisma.review.createMany({
//     data
//   })
// }

// addReviewData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////// Seed Restaurant ////////////////////////////////////////

// data = restaurantData

// async function addRestaurantData() {
//   await prisma.restaurant.createMany({
//     data
//   })
// }

// addRestaurantData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////// Seed TableReview ////////////////////////////////////////

// data = tableReviewData

// async function addTableReviewData() {
//   await prisma.table_review.createMany({
//     data
//   })
// }

// addTableReviewData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////// Seed Address ////////////////////////////////////////

// data = addressData

// async function addAddressData() {
//   await prisma.address.createMany({
//     data
//   })
// }

// addAddressData()
//   .catch((e) => {
//     console.log(e)
//     process.exit(1)
//   })

/////////////////////////////////////////////////////////////////////////////////////////////////////









