import axios from 'axios';

const searchAPI = {
  getResults: (key) => {
    const url = `http://localhost:5000/search/${key}`;
    return axios.get(url);
  },
  getReviewResults: (key) => {
    const url = `http://localhost:5000/search/reviews/${key}`;
    return axios.get(url);
  },
  getDataByCategories: (id) => {
    const url = `http://localhost:5000/home/categories/${id}`;
    return axios.get(url);
  },
};
export default searchAPI;
