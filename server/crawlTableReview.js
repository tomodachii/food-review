const fs = require('fs');
const faker = require('faker');

async function getData() {
  let tableReview = JSON.parse(fs.readFileSync('./data.json'));
  let userList = JSON.parse(fs.readFileSync('./user.json'));
  let reviewId = [];

  tableReview.forEach(function (data) {
    let item = {
      user_id: data.user_id,
      review_id: data.review_id,
    };
    reviewId.push(item);
  });

  tableReview.forEach(function (data) {
    delete data['title'];
    delete data['description'];
    delete data['likes'];
    delete data['displayName'];
    delete data['user_rating'];
    delete data['restaurant_id'];
    delete data['restaurant_name'];
    delete data['restaurant_rating'];
    delete data['restaurant_image'];
    delete data['address'];
    delete data['service'];
    delete data['price'];
    delete data['food'];
    delete data['ambience'];
    delete data['review_image'];
    delete data['username'];
    delete data['avatar'];
    delete data['restaurant_alias_link'];
    delete data['review_alias_link'];
    delete data['name'];
    delete data['list_media'];

    data['create_at'] = faker.date.recent();
    data['action'] = 'write';
  });

  function makeReview(user_id) {
    let tempList = reviewId;
    let remainReview = tempList.filter((review) => review.user_id != user_id);
    return remainReview;
  }

  function likeReview(user_id, remainReview) {
    let tempList = remainReview;
    let list = [];

    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * tempList.length);
      if (tempList[random] != null) {
        let item = tempList[random];
        tempList.splice(random, 1);
        item['action'] = 'liked';
        delete item['user_id'];
        item['user_id'] = user_id;
        list.push(item);
      }
    }
    // console.log(list)
    return list;
  }

  function savedReview(user_id, remainReview) {
    let tempList = remainReview;
    let list = [];

    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * tempList.length);
      if (tempList[random] != null) {
        let item = tempList[random];
        tempList.splice(random, 1);
        item['action'] = 'saved';
        delete item['user_id'];
        item['user_id'] = user_id;
        list.push(item);
      }
    }
    // console.log(list)
    return list;
  }

  function pushData(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      list2.push(Object.assign({}, list1[i]));
    }
  }

  let tableReview2 = [];
  tableReview2 = tableReview;
  var tempList = [];

  for (let i = 0; i < userList.length; i++) {
    let remainReview = makeReview(userList[i].user_id);
    // let savedList = savedReview(userList[i].user_id, remainReview)
    let likedList = likeReview(userList[i].user_id, remainReview);
    // pushData(savedList, tempList)
    pushData(likedList, tempList);
    // console.log(savedList)
    // console.log(likedList);
    // tempList.push(...savedList);
    // let temp = [...tempList, ...likedList];
    // tempList = temp;
  }

  console.log(tempList);

  // var json_data = JSON.stringify(tempList, null, 2)
  // fs.writeFile('./tableReview2.json', json_data, (err) => {
  //   if(err) {
  //     throw err
  //   }
  //   console.log("Saved")
  // })
}
getData();
