import axios from 'axios';

const reviewsAPI = {
  getReview: (id) => {
    const url = `http://localhost:5000/reviews/${id}`;
    return axios.get(url);
  },
  getReviewImages: (id) => {
    const url = `http://localhost:5000/reviews/reviewImage/${id}`;
    return axios.get(url);
  },
};
export default reviewsAPI;
