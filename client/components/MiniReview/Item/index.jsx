import LikeButton from '../../LikeButton';
import { useRouter } from 'next/dist/client/router';
import UserContext from '../../../UserContext';
import { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { notification, Button, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import userAPI from '../../../api/users';

const MiniReviewItem = ({ data, flag }) => {
  // useEffect(() => {
  //   userLikedReviews.forEach((item) => {
  //     if (item.review.review_id === data.review.review_id) setLiked(true);
  //   });
  // });
  // const [likesNumber, setLikesNumber] = useState(data.review.likes);
  const { user } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (user) {
      if (data.users.username == user.username) {
        setEditable(true);
      }
    }
  }, []);
  const truncates = (input) =>
    input.length > 80 ? `${input.substring(0, 80)}...` : input;
  const router = useRouter();
  const onReviewClick = () => {
    router.push(`/reviews/${data.review.review_id}`);
  };

  const onUserClick = () => {
    router.push(`/user/${data.users.username}`);
  };
  const onDeleteBtnClick = () => {
    userAPI.deleteReview(data.review.review_id);
    router.push(`/user/${data.users.username}`);
  };
  const onEditBtnClick = () => {
    router.push(`/reviews/${data.review.review_id}/edit`);
  };

  // const handleUnlike = async () => {
  //   if (user) {
  //     setLiked(false);
  //   } else {
  //     await openNotification('error', 'You have to log in first');
  //     await setLoginModalOpen(true);
  //   }
  // };

  // const handleLike = async () => {
  //   if (user) {
  //     await setLiked(true);
  //     await setLikesNumber((prevState) => prevState + 1);
  //     await userAPI
  //       .like(data.review.review_id, { user_id: user.user_id })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   } else {
  //     await openNotification('error', 'You have to log in first');
  //     await setLoginModalOpen(true);
  //   }
  // };

  // const openNotification = (type, msg) => {
  //   notification[type]({
  //     message: msg,
  //     duration: 3,
  //   });
  // };

  return (
    <div className='relative w-full py-5 px-3 break-inside-avoid '>
      <div className='review--mini bg-white relative w-full rounded-xl shadow-md border-2 border-grey-50 transition duration-500 ease-in-out hover:shadow-xl'>
        <div className='w-3/4 review__img rounded-xl relative cursor-pointer overflow-hidden'>
          <img
            onError={(e) => {
              flag
                ? (e.target.src = 'images/avatars/punpun.png')
                : (e.target.src = '../../images/avatars/punpun.png');
            }}
            className='w-full rounded-xl shadow-lg hover:scale-110 transition duration-500 ease-in-out'
            src={data.review.review_image}
          />
          {editable && (
            <Space className='hover:opacity-100 absolute w-full h-full transition duration-500 ease-in-out opacity-0 z-auto top-0 flex align-middle justify-center bg-custom-overlay-color'>
              <button
                className='bg-red-500 text-white rounded-full px-2 py-1 opacity-100 w-12 h-12 hover:scale-110 transition duration-500 ease-in-out'
                onClick={onDeleteBtnClick}>
                <DeleteOutlined className='-translate-y-0.5' />
              </button>
              <button
                className='bg-white text-black rounded-full px-2 py-1 opacity-100 w-12 h-12 hover:scale-110 transition duration-500 ease-in-out'
                onClick={onEditBtnClick}>
                <EditOutlined className='-translate-y-0.5' />
              </button>
            </Space>
          )}
        </div>
        <div className='relative review--mini__content p-5'>
          <Tooltip
            title={data.review.title}
            color='#dd2f46'
            placement='topLeft'>
            <h4
              className='inline-block mb-1 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'
              onClick={onReviewClick}>
              {data.review.title}
            </h4>
          </Tooltip>
          <h5 className='text-gray-400 overflow-hidden'>
            {truncates(parse(data.review.description))}
          </h5>

          <div className='flex items-center justify-between'>
            <Tooltip placement='bottomLeft' title={data.users.username}>
              <div
                className='flex gap-2 items-center overflow-hidden'
                onClick={onUserClick}>
                <img
                  onError={(e) => {
                    flag
                      ? (e.target.src = 'images/avatars/punpun.png')
                      : (e.target.src = '../../images/avatars/punpun.png');
                  }}
                  className='m-0 rounded-full h-8 w-8 cursor-pointer'
                  src={data.users.avatar}
                />
                <p className='m-0 cursor-pointer inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'>
                  {data.users.username}
                </p>
              </div>
            </Tooltip>

            <div className='flex '>
              <LikeButton
                reviewID={data.review.review_id}
                likes={data.review.likes}
                margin={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniReviewItem;
