import { FaHeart, FaRegHeart } from 'react-icons/fa';
import UserContext from '../../UserContext';
import { useEffect, useState, useContext } from 'react';
import userAPI from '../../api/users';
import { notification } from 'antd';

const LikeButton = ({ size, reviewID, likes, margin }) => {
  useEffect(async () => {
    userLikedReviews.forEach((item) => {
      if (item.review_id === reviewID) setLiked(true);
    });
  });

  // useEffect(() => {
  //   console.log(userLikedReviews);
  // }, [userLikedReviews]);

  const [likesNumber, setLikesNumber] = useState(likes);
  const { user, setLoginModalOpen, userLikedReviews, setUserLikedReviews } =
    useContext(UserContext);
  const [liked, setLiked] = useState(false);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleUnlike = async () => {
    if (user) {
      setLiked(false);
      setLikesNumber((prevState) => prevState - 1);
      let temp = await userAPI
        .unlike(reviewID, { user_id: user.user_id })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      await setUserLikedReviews((prevState) =>
        prevState.filter((item) => item.review_id !== temp.review_id)
      );
    } else {
      openNotification('error', 'You have to log in first');
      await setLoginModalOpen(true);
    }
  };

  const handleLike = async () => {
    if (user) {
      setLiked(true);
      setLikesNumber((prevState) => prevState + 1);
      let temp = await userAPI
        .like(reviewID, { user_id: user.user_id })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      console.log(temp);
      setUserLikedReviews((prevState) => [...prevState, temp]);
    } else {
      openNotification('error', 'You have to log in first');
      await setLoginModalOpen(true);
    }
  };

  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-2xl';
  }

  return (
    <>
      {liked ? (
        <FaHeart
          className={'text-red-700 cursor-pointer' + fontSize}
          onClick={handleUnlike}
        />
      ) : (
        <FaRegHeart
          className={'text-black cursor-pointer' + fontSize}
          onClick={handleLike}
        />
      )}
      <h5 className={margin ? 'text-gray-400 m-0 ml-1' : 'text-gray-400 m-0'}>
        {likesNumber}
      </h5>
    </>
  );
};

export default LikeButton;
