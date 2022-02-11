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
  getComments: (id) => {
    const url = `http://localhost:5000/reviews/${id}/comments`;
    return axios.get(url);
  },
  getReviewByDate: (d1, d2) => {
    const url = `http://localhost:5000/reviews/${d1}/${d2}`;
    return axios.get(url);
  },
};
export default reviewsAPI;
