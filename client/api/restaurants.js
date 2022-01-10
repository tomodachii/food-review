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
};
export default restaurantsAPI;
