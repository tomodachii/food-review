import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../LikeButton';
import SaveButton from '../../SaveButton';

const Item = ({ review }) => {
  return (
    <div className='w-full m-5 p-5  bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-lg'>
      <div className='flex items-center gap-5 mb-4'>
        <Avatar src={review.user_img} size={68} icon={<UserOutlined />} />
        <div className='flex flex-col gap-1'>
          <h4 className='m-0 cursor-pointer hover:text-red-600'>nigga</h4>
          <h5 className='m-0 text-gray-400'>12/12/2021</h5>
        </div>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <h4 className='m-0 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
          {review.title}
        </h4>

        <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
          <h5 className='m-0 text-white'>{review.rating}</h5>
          <AiTwotoneStar className=' text-white' />
        </div>
      </div>
      <p className='text-gray-500'>{review.description}</p>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-1'>
          <LikeButton size='medium' />
          <h5 className='m-0 text-gray-400'>{review.like}</h5>
        </div>
        <SaveButton size='medium' />
      </div>
    </div>
  );
};

export default Item;
