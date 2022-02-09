import { useState, useContext, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import userAPI from '../../api/users';
import UserContext from '../../UserContext';
import { notification } from 'antd';

const SaveButton = ({ size, reviewID }) => {
  const { user, setLoginModalOpen, userSavedReviews } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-xl';
  }

  useEffect(() => {
    console.log('bookmark', userSavedReviews);
    let check = userSavedReviews.some((item) => item.review_id === reviewID);
    if (check) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [userSavedReviews]);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleUnsave = async () => {
    setSaved(false);
    if (user) {
      await userAPI.unsave(reviewID, { user_id: user.user_id }).catch((err) => {
        console.log(err);
        setSaved(true);
      });
    } else {
      openNotification('error', 'You have to log in first');
      setLoginModalOpen(true);
    }
  };

  const handleSave = () => {
    setSaved(true);
    if (user) {
      userAPI
        .save(reviewID, { user_id: user.user_id })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          setSaved(false);
        });
    } else {
      openNotification('error', 'You have to log in first');
      setLoginModalOpen(true);
    }
  };

  return saved ? (
    <FaBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={handleUnsave}
    />
  ) : (
    <FaRegBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={handleSave}
    />
  );
};

export default SaveButton;
