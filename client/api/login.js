import axios from 'axios';

const loginAPI = {
  login: (user) => {
    const url = `http://localhost:5000/users/signin`;
    return axios.post(url, user);
  },
  register: (user) => {
    const url = `http://localhost:5000/users/signup`;
    return axios.post(url, user);
  },
  logout: () => {
    const url = `http://localhost:5000/users/logout`;
    return axios.post(url);
  },
};
export default loginAPI;
