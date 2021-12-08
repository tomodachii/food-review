import axios from 'axios';

const homeAPI = {
  getData: (id) => {
    const url = `http://localhost:5000/home/${id}`;
    return axios.get(url);
  },
};
export default homeAPI;
