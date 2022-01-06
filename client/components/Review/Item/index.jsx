import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../LikeButton';
import SaveButton from '../../SaveButton';

const Item = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className='w-full p-6 mb-5 bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-xl'>
      <div className='flex items-center gap-5 mb-4'>
        <img
          src={data.users.avatar}
          className='rounded-full h-16 w-16'
          onError={(e) => {
            console.log(e);
            e.target = '../images/avatars/punpun.png';
          }}
        />
        <div className='flex flex-col gap-1'>
          <h4 className='m-0 cursor-pointer hover:text-red-600'>
            {data.users.username}
          </h4>
          <h5 className='m-0 text-gray-400'>{data.create_at}</h5>
        </div>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <h4 className='m-0 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
          {data.review.title}
        </h4>

        <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
          <h5 className='m-0 text-white'>{5}</h5>
          <AiTwotoneStar className=' text-white' />
        </div>
      </div>
      <p className='text-gray-500'>{data.review.description}</p>
      <div className='flex mb-5 gap-5 overflow-hidden'>
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
          onError={(e) => {
            console.log(e);
            e.target.src = '../images/avatars/punpun.png';
          }}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
        <img
          className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
          src={data.review.review_image}
        />
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-1'>
          <LikeButton size='medium' />
          <h5 className='m-0 text-gray-400'>{data.review.likes}</h5>
        </div>
        <SaveButton size='medium' />
      </div>
    </div>
  );
};

export default Item;
