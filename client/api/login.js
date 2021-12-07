import axios from 'axios';

const loginAPI = {
  getData: (id) => {
    const url = `http://localhost:5000/home/${id}`;
    return axios.get(url);
  },

  checkRole: (taskId, userId) => {
    return axios.post('/task/check-role', { taskId, userId });
  },
};
export default loginAPI;
