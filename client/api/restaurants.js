import axios from 'axios';

const restaurantsAPI = {
  getRestaurants: () => {
    const url = `http://localhost:5000/restaurants/`;
    return axios.get(url);
  },
  getRestaurant: (id) => {
    const url = `http://localhost:5000/restaurants/${id}`;
    return axios.get(url);
  },
  getRestaurantImages: (id) => {
    const url = `http://localhost:5000/restaurants/images/${id}`;
    return axios.get(url);
  },
  getDistricts: () => {
    const url = `http://localhost:5000/districts`;
    return axios.get(url);
  },

};
export default restaurantsAPI;
