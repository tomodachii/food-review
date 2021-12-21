import LikeButton from '../../LikeButton';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'antd';

const MiniReviewItem = ({ review }) => {
  const router = useRouter();
  const onReviewClick = () => {
    router.push(`/reviews/${review.id}`);
  };

  const onUserClick = () => {
    router.push(`/user/${review.user}`);
  };

  return (
    <div className='relative w-full py-5 px-3 break-inside-avoid '>
      <div className='review--mini bg-white relative w-full rounded-xl shadow-md border-2 border-grey-50 transition duration-500 ease-in-out hover:shadow-xl'>
        <div className='w-3/4 review__img rounded-xl relative cursor-pointer overflow-hidden'>
          <img
            className='w-full rounded-xl shadow-lg hover:scale-110 transition duration-500 ease-in-out'
            src={review.img}
          />
        </div>
        <div className='relative review--mini__content p-5'>
          <Tooltip title={review.title} color='#dd2f46' placement='topLeft'>
            <h4
              className='inline-block mb-1 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'
              onClick={onReviewClick}>
              {review.title}
            </h4>
          </Tooltip>
          <h5 className='text-gray-400'>{review.description}</h5>

          <div className='flex items-center justify-between'>
            <Tooltip placement='bottomLeft' title={review.user}>
              <div
                className='flex gap-2 items-center overflow-hidden'
                onClick={onUserClick}>
                <img
                  className='m-0 rounded-full h-8 w-8 cursor-pointer'
                  src={review.user_img}
                />
                <p className='m-0 cursor-pointer inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'>
                  {review.user}
                </p>
              </div>
            </Tooltip>

            <div className='flex '>
              <LikeButton />
              <h5 className='text-gray-400 m-0 ml-1 '>{review.like}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniReviewItem;
