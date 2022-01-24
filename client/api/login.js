import axios from 'axios';

const loginAPI = {
  login: (user) => {
    const url = `http://localhost:5000/users/signin`;
    return axios.post(url, user, { withCredentials: true });
  },
  register: (user) => {
    const url = `http://localhost:5000/users/signup`;
    return axios.post(url, user, { withCredentials: true });
  },
  logout: () => {
    const url = `http://localhost:5000/users/logout`;
    return axios.post(url, { withCredentials: true });
  },
};
export default loginAPI;
