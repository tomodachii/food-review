import axios from 'axios';

const userAPI = {
  getLoginUser: () => {
    const url = `http://localhost:5000/users`;
    return axios.get(url);
  },
  getUser: (username) => {
    const url = `http://localhost:5000/users/${username}`;
    return axios.get(url);
  },
  getUserLikedReviews: (id) => {
    const url = `http://localhost:5000/users/likedReviews/${id}`;
    return axios.get(url);
  },
  getUserWrittenReviews: (id) => {
    const url = `http://localhost:5000/users/myReviews/${id}`;
    return axios.get(url);
  },
  getUserSavedReviews: (id) => {
    const url = `http://localhost:5000/users/savedReviews/${id}`;
    return axios.get(url);
  },
  like: (id, { user_id }) => {
    const url = `http://localhost:5000/users/like/${id}`;
    return axios.post(url, { user_id: user_id });
  },
};
export default userAPI;
