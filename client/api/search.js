import axios from 'axios';

const searchAPI = {
  getResults: (key) => {
    const url = `http://localhost:5000/search/all/${key}`;
    return axios.get(url);
  },
  getReviewResults: (key) => {
    const url = `http://localhost:5000/search/reviews/${key}`;
    return axios.get(url);
  },
  getRestaurantResults: (key) => {
    const url = `http://localhost:5000/search/restaurants/${key}`;
    return axios.get(url);
  },
  getUserResults: (key) => {
    const url = `http://localhost:5000/search/users/${key}`;
    return axios.get(url);
  },
};
export default searchAPI;
