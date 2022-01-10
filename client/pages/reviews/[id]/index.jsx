import FRLayout from '../../../layouts/FRLayout';
import Slider from '../../../components/Review/Slider';
// import data from '../../../testreview';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../../components/LikeButton';
import SaveButton from '../../../components/SaveButton';
import { Comment, Tooltip } from 'antd';
import reviewsAPI from '../../../api/reviews';
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
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }>
    {children}
  </Comment>
);

const Review = ({ data, imgList }) => {
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
              <LikeButton size='large' likes={data.review.likes} />
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
              />
            </Tooltip>

            <div>
              <SaveButton size='large' />
            </div>
            <div></div>
          </div>
          <div className='flex items-center mb-5 gap-5'>
            <AiTwotoneStar className='text-2xl text-yellow-400' />
            <h3 className='m-0'>{`${data.review.user_rating} / 5`}</h3>
          </div>
          <p>{data.review.description}</p>
          <ExampleComment>
            <ExampleComment>
              <ExampleComment />
              <ExampleComment />
            </ExampleComment>
          </ExampleComment>
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
      router.push('/404');
    });
  return {
    data,
    imgList,
  };
};
export default Review;
