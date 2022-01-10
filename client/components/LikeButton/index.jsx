import { FaHeart, FaRegHeart } from 'react-icons/fa';
import UserContext from '../../UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import userAPI from '../../api/users';
import { notification } from 'antd';

const LikeButton = ({ size, reviewID, likes, margin }) => {
  useEffect(() => {
    userLikedReviews.forEach((item) => {
      if (item.review.review_id === reviewID) setLiked(true);
    });
  });
  const [likesNumber, setLikesNumber] = useState(likes);
  const { user, setLoginModalOpen, userLikedReviews } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleUnlike = async () => {
    if (user) {
      setLiked(false);
    } else {
      await openNotification('error', 'You have to log in first');
      await setLoginModalOpen(true);
    }
  };

  const handleLike = async () => {
    if (user) {
      await setLiked(true);
      await setLikesNumber((prevState) => prevState + 1);
      await userAPI
        .like(reviewID, { user_id: user.user_id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      await openNotification('error', 'You have to log in first');
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
