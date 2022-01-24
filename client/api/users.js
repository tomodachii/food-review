import axios from 'axios';

const userAPI = {
  getLoginUser: () => {
    const url = `http://localhost:5000/users`;
    return axios.get(url);
  },
  getUser: (username) => {
    const url = `http://localhost:5000/users/account/${username}`;
    return axios.get(url);
  },
  getUserLikedReviews: (id) => {
    const url = `http://localhost:5000/users/likedReviews/${id}`;
    return axios.get(url);
  },
  getUserLikedReviewsArray: (id) => {
    const url = `http://localhost:5000/users/likedReviewsArray/${id}`;
    return axios.get(url);
  },
  getUserWrittenReviews: (id) => {
    const url = `http://localhost:5000/users/myReviews/${id}`;
    return axios.get(url);
  },
  getUserSavedReviews: (id) => {
    const url = `http://localhost:5000/users/savedReviews/${id}`;
    return axios.get(url);
  },
  getUserSavedReviewsArray: (id) => {
    const url = `http://localhost:5000/users/savedReviewsArray/${id}`;
    return axios.get(url);
  },
  like: (review_id, { user_id }) => {
    const url = `http://localhost:5000/users/like/${review_id}`;
    return axios.post(url, { user_id: user_id });
  },
  unlike: (review_id, { user_id }) => {
    const url = `http://localhost:5000/users/removelike/${review_id}`;
    return axios.post(url, { user_id: user_id });
  },
  save: (review_id, { user_id }) => {
    const url = `http://localhost:5000/users/save/${review_id}`;
    return axios.post(url, { user_id: user_id });
  },
  unsave: (review_id, { user_id }) => {
    const url = `http://localhost:5000/users/unsave/${review_id}`;
    return axios.post(url, { user_id: user_id });
  },
};
export default userAPI;
