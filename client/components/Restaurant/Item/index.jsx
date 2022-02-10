import { UserOutlined } from '@ant-design/icons';
import { FiEdit3 } from 'react-icons/fi';
import { AiTwotoneStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { MdAccessTimeFilled } from 'react-icons/md';
import { useRouter } from 'next/router';

const Item = ({ restaurant, disableReview }) => {
  const router = useRouter();
  const truncates = (input) =>
    input.length > 200 ? `${input.substring(0, 200)}...` : input;
  return (
    <div className='w-full p-6 mb-5 bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-lg'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex gap-5 items-center'>
          <img
            src={restaurant.restaurant_image}
            className='w-24 h-24 cursor-pointer'
            onError={(e) => {
              e.target.src = '../images/avatars/punpun.png';
            }}
            onClick={() =>
              router.push(`/restaurants/${restaurant.restaurant_id}`)
            }
          />
          <div className='flex flex-col items-start gap-3'>
            <h4
              className='m-0 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'
              onClick={() =>
                router.push(`/restaurants/${restaurant.restaurant_id}`)
              }>
              {restaurant.restaurant_name}
            </h4>

            <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
              <h5 className='m-0 text-white'>
                {Math.round(restaurant.restaurant_rating / 2)}
              </h5>
              <AiTwotoneStar className=' text-white' />
            </div>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <FiEdit3 className='text-2xl cursor-pointer' />
        </div>
      </div>

      <div className='my-4'>
        <div className='flex items-center gap-2'>
          <MdLocationOn />
          <p className='text-gray-500 m-0'>
            Address: {restaurant.address.address}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <AiFillPhone />
          <p className='text-gray-500 m-0'>Contact: {restaurant.phoneNumber}</p>
        </div>
        <div className='flex items-center gap-2'>
          <MdAccessTimeFilled />
          <p className='text-gray-500 m-0'>Time: {restaurant.openingTime}</p>
        </div>
      </div>
      <div className='flex mb-5 gap-5 overflow-hidden'>
        {/* <img
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
        /> */}
      </div>
      {!disableReview && (
        <div className='flex flex-col gap-5'>
          {restaurant.review.map((review, index) => (
            <div
              className='flex gap-3 w-full'
              key={new Date().getTime().toString + index}>
              <div className='h-14 w-14'>
                <img
                  onError={(e) => {
                    e.target.src = '../images/avatars/punpun.png';
                  }}
                  src={review.users.avatar}
                  className='m-0 rounded-full h-12 w-12 cursor-pointer'
                />
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-3'>
                    <h4
                      onClick={() => {
                        router.push(`/users/${review.user.username}`);
                      }}
                      className='m-0 cursor-pointer transition duration-300 ease-in-out hover:text-red-600'>
                      {review.users.username}
                    </h4>
                    <p className='text-gray-400 m-0'>{review.create_at}</p>
                  </div>
                  <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
                    <h5 className='m-0 text-white'>
                      {review.review.user_rating}
                    </h5>
                    <AiTwotoneStar className=' text-white' />
                  </div>
                </div>
                <div className=''>
                  <p className='text-gray-500 m-0'>
                    {truncates(review.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
