import { UserOutlined } from '@ant-design/icons';
import { FiEdit3 } from 'react-icons/fi';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../LikeButton';
import SaveButton from '../../SaveButton';
import { MdLocationOn } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { MdAccessTimeFilled } from 'react-icons/md';
import items from '../../../testcategories';
import { useEffect, useState } from 'react';

const Item = ({ restaurant }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(items.slice(0, 2));
  }, []);
  return (
    <div className='w-full p-6 mb-5 bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-lg'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex gap-5 items-center'>
          <img src={restaurant.user_img} className='w-24 h-24' />
          <div className='flex flex-col items-start gap-3'>
            <h4 className='m-0 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
              {restaurant.title}
            </h4>

            <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
              <h5 className='m-0 text-white'>{restaurant.rating}</h5>
              <AiTwotoneStar className=' text-white' />
            </div>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <FiEdit3 className='text-2xl cursor-pointer' />
          <SaveButton size='medium' />
        </div>
      </div>

      <div className='my-4'>
        <div className='flex items-center gap-2'>
          <MdLocationOn />
          <p className='text-gray-500 m-0'>Address: </p>
        </div>
        <div className='flex items-center gap-2'>
          <AiFillPhone />
          <p className='text-gray-500 m-0'>Contact: </p>
        </div>
        <div className='flex items-center gap-2'>
          <MdAccessTimeFilled />
          <p className='text-gray-500 m-0'>Time: </p>
        </div>
      </div>
      <div className='flex mb-5 gap-5 overflow-hidden'>
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={restaurant.img}
        />
      </div>
      <div className='flex flex-col gap-5'>
        {reviews.map((review, index) => (
          <div
            className='flex gap-3 w-full'
            key={new Date().getTime().toString + index}>
            {/* <img
              src={review.user_img}
              className='m-0 rounded-full h-12 w-12 cursor-pointer'
            /> */}
            <div className='h-14 w-14'>
              <img
                src={review.user_img}
                className='m-0 rounded-full h-12 w-12 cursor-pointer'
              />
            </div>

            <div className='flex flex-col w-full'>
              <div className='flex justify-between items-center w-full'>
                <div className='flex items-center'>
                  <h4 className='m-0'>{review.user}</h4>
                  <p className='text-gray-400 m-0'>time</p>
                </div>
                <div>star</div>
              </div>
              <div className=''>
                <p className='text-gray-500 m-0'>{review.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
