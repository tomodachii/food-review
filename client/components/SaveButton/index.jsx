import { useState, useContext, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import userAPI from '../../api/users';
import UserContext from '../../UserContext';
import { notification } from 'antd';

const SaveButton = ({ size, reviewID }) => {
  useEffect(() => {
    userSavedReviews.forEach((item) => {
      if (item.review.review_id === reviewID) setSaved(true);
    });
  });
  const { user, setLoginModalOpen, userSavedReviews } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-xl';
  }

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleUnsave = async () => {
    if (user) {
      await setSaved(false);
      await userAPI
        .unsave(reviewID, { user_id: user.user_id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      await openNotification('error', 'You have to log in first');
      await setLoginModalOpen(true);
    }
  };

  const handleSave = async () => {
    if (user) {
      await setSaved(true);
      await userAPI
        .save(reviewID, { user_id: user.user_id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      await openNotification('error', 'You have to log in first');
      await setLoginModalOpen(true);
    }
  };

  return saved ? (
    <FaBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={() => handleUnsave}
    />
  ) : (
    <FaRegBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={() => handleSave}
    />
  );
};

export default SaveButton;
