import LikeButton from '../../LikeButton';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'antd';

const MiniReviewItem = ({ data }) => {
  const truncates = (input) =>
    input.length > 150 ? `${input.substring(0, 150)}...` : input;
  const router = useRouter();
  const onReviewClick = () => {
    router.push(`/reviews/${data.review.review_id}`);
  };

  const onUserClick = () => {
    router.push(`/user/${data.users.username}`);
  };

  return (
    <div className='relative w-full py-5 px-3 break-inside-avoid '>
      <div className='review--mini bg-white relative w-full rounded-xl shadow-md border-2 border-grey-50 transition duration-500 ease-in-out hover:shadow-xl'>
        <div className='w-3/4 review__img rounded-xl relative cursor-pointer overflow-hidden'>
          <img
            onError={(e) => {
              e.target.src = 'images/avatars/punpun.png';
            }}
            className='w-full rounded-xl shadow-lg hover:scale-110 transition duration-500 ease-in-out'
            src={data.review.review_image}
          />
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
            {truncates(data.review.description)}
          </h5>

          <div className='flex items-center justify-between'>
            <Tooltip placement='bottomLeft' title={data.users.username}>
              <div
                className='flex gap-2 items-center overflow-hidden'
                onClick={onUserClick}>
                <img
                  onError={(e) => {
                    e.target.src = 'images/avatars/punpun.png';
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
              <LikeButton />
              <h5 className='text-gray-400 m-0 ml-1 '>{data.review.likes}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniReviewItem;
