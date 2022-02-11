import FRLayout from '../../../layouts/FRLayout';
import Slider from '../../../components/Review/Slider';
// import data from '../../../testreview';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../../components/LikeButton';
import SaveButton from '../../../components/SaveButton';
import { Comment, Tooltip, Rate } from 'antd';
import reviewsAPI from '../../../api/reviews';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import restaurantsAPI from '../../../api/restaurants';
import RestaurantContainer from '../../../components/Restaurant';
import { useEffect } from 'react';
import CommentSection from '../../../components/CommentSection';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <img
        className='w-12 h-12 rounded-full'
        src='https://joeschmoe.io/api/v1/random'
        alt='Han Solo'
      />
    }
    content={<p>Ngon.</p>}>
    {children}
  </Comment>
);

const ExampleComment1 = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <img
        className='w-12 h-12 rounded-full'
        src='https://joeschmoe.io/api/v1/random'
        alt='Han Solo'
      />
    }
    content={<p>Nhưng hơi đắt</p>}>
    {children}
  </Comment>
);

const ExampleComment2 = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <img
        className='w-12 h-12 rounded-full'
        src='https://joeschmoe.io/api/v1/random'
        alt='Han Solo'
      />
    }
    content={<p>Đồ ăn dạo này đắt thế nhỉ</p>}>
    {children}
  </Comment>
);

const ExampleComment3 = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <img
        className='w-12 h-12 rounded-full'
        src='https://joeschmoe.io/api/v1/random'
        alt='Han Solo'
      />
    }
    content={<p>Ngon</p>}>
    {children}
  </Comment>
);

const Review = ({ data, imgList, restaurant }) => {
  const router = useRouter();
  useEffect(() => {
    console.log('restaurant');
    console.log(data.review);
  }, []);
  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='my-5 mx-auto w-1/2 relative p-5'>
          <h4 className='text-gray-400 ml-1'>
            {data.review.category.category_name}
          </h4>
          <h1>{data.review.title}</h1>
        </div>
        <Slider data={imgList} />
        <div className='mx-auto w-1/2 p-5 relative'>
          <div className='flex flex-col items-center fixed left-[17%] top-1/4 z-10 gap-3'>
            <div className='flex flex-col items-center gap-3'>
              <LikeButton
                size='large'
                likes={data.review.likes}
                reviewID={data.review.review_id}
              />
            </div>
            {/* <h5 className='text-gray-500 m-0'>{data.review.likes}</h5> */}
            <Tooltip placement='left' title={data.users.username}>
              <img
                className='h-12 w-12 rounded-full object-cover my-2 cursor-pointer'
                src={data.users.avatar}
                alt=''
                onError={(e) => {
                  e.target.src = '../images/avatars/punpun.png';
                }}
                onClick={() => router.push(`/user/${data.users.username}`)}
              />
            </Tooltip>

            <div>
              <SaveButton size='large' reviewID={data.review.review_id} />
            </div>
            <div></div>
          </div>
          <div className='flex items-center mb-5 gap-5 justify-evenly'>
            <div className='flex items-center gap-5'>
              <AiTwotoneStar className='text-2xl text-yellow-400' />
              <h3 className='m-0'>{`${
                Math.round(data.review.user_rating) / 2
              } / 5`}</h3>
            </div>
            <Rate
              disabled
              allowHalf
              style={{ color: 'red' }}
              character={({ index }) => customIcons[index + 1]}
              defaultValue={Math.round(data.review.user_rating) / 2}
            />
          </div>
          <p>{parse(data.review.description)}</p>
          <RestaurantContainer
            restaurants={[restaurant]}
            disableReview={true}
          />
          {/* <ExampleComment>
            <ExampleComment1>
              <ExampleComment2 />
              <ExampleComment3 />
            </ExampleComment1>
          </ExampleComment> */}
          <CommentSection review_id={data.review.review_id} />
        </div>
      </div>
    </FRLayout>
  );
};

Review.getInitialProps = async ({ query }) => {
  const { id } = query;
  const data = await reviewsAPI
    .getReview(id)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  const imgList = await reviewsAPI
    .getReviewImages(id)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  const restaurant = await restaurantsAPI
    .getRestaurant(data.review.restaurant_id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    data,
    imgList,
    restaurant,
  };
};
export default Review;
