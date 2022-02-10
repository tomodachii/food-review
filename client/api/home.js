import axios from 'axios';

const homeAPI = {
  getData: (id) => {
    const url = `http://localhost:5000/home/${id}`;
    return axios({
      method: 'GET',
      url,
      withCredentials: true,
    });
  },
  getCategories: () => {
    const url = `http://localhost:5000/home/categories`;
    return axios.get(url, { withCredentials: true });
  },
  getDataByCategories: (id) => {
    const url = `http://localhost:5000/home/categories/${id}`;
    return axios.get(url, { withCredentials: true });
  },
  getTrends: () => {
    const url = `http://localhost:5000/home/trends`;
    return axios.get(url, { withCredentials: true });
  },
};
export default homeAPI;
