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
};
export default loginAPI;
