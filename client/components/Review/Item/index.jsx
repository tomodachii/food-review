import { notification } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../LikeButton';
import SaveButton from '../../SaveButton';
import reviewsAPI from '../../../api/reviews';
import { useRouter } from 'next/router';

const Item = ({ data }) => {
  const router = useRouter();
  const onReviewClick = () => {
    router.push(`/reviews/${data.review.review_id}`);
  };

  const onUserClick = () => {
    router.push(`/user/${data.users.username}`);
  };

  const [imgList, setImgList] = useState([]);
  useEffect(async () => {
    let items = await reviewsAPI
      .getReviewImages(data.review.review_id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setImgList(items);
  }, []);
  const truncates = (input) =>
    input.length > 200 ? `${input.substring(0, 200)}...` : input;

  const convertDate = (dateTime) => {
    let index = dateTime.indexOf('T');
    let date = dateTime.slice(0, 10);
    let time = dateTime.slice(index + 1, index + 6);
    return { index, date, time };
  };

  return (
    <div className='w-full p-6 mb-5 bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-xl'>
      <div className='flex items-center gap-5 mb-4'>
        <img
          src={data.users.avatar}
          className='rounded-full h-16 w-16'
          onError={(e) => {
            e.target.src = '../images/avatars/punpun.png';
          }}
        />
        <div className='flex flex-col gap-1'>
          <h4
            onClick={onUserClick}
            className='m-0 cursor-pointer hover:text-red-600'>
            {data.users.username}
          </h4>
          <h5 className='m-0 text-gray-400'>
            {`${convertDate(data.create_at).time} ngày ${
              convertDate(data.create_at).date
            }`}
          </h5>
        </div>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <h4
          onClick={onReviewClick}
          className='m-0 cursor-pointer hover:text-red-600 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
          {data.review.title}
        </h4>

        <div className='inline-flex items-center gap-1 p-1 rounded-xl bg-red-600'>
          <h5 className='m-0 text-white'>{5}</h5>
          <AiTwotoneStar className=' text-white' />
        </div>
      </div>
      <p className='text-gray-500'>{truncates(data.review.description)}</p>
      <div className='flex mb-5 gap-5 overflow-hidden'>
        {imgList?.length > 7
          ? imgList.slice(0, 7).map((item, index) => (
              <img
                key={new Date().getTime().toString + index}
                className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
                src={item.image_link}
                onError={(e) => {
                  e.target.src = '../images/avatars/punpun.png';
                }}
              />
            ))
          : imgList.map((item, index) => (
              <img
                key={new Date().getTime().toString + index}
                className='object-cover h-[95px] w-[95px] rounded-lg cursor-pointer'
                src={item.image_link}
                onError={(e) => {
                  e.target.src = '../images/avatars/punpun.png';
                }}
              />
            ))}
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-1'>
          <LikeButton
            size='medium'
            reviewID={data.review.review_id}
            likes={data.review.likes}
            margin={true}
          />
        </div>
        <SaveButton size='medium' reviewID={data.review.review_id} />
      </div>
    </div>
  );
};

export default Item;
