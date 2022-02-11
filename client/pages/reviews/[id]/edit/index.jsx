import FRLayout from '../../../../layouts/FRLayout';
import Slider from '../../../../components/Review/Slider';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../../../components/LikeButton';
import SaveButton from '../../../../components/SaveButton';
import {
  Comment,
  Tooltip,
  Rate,
  Input,
  Form,
  Button,
  Divider,
  Select,
  notification,
  Image,
} from 'antd';
import { useState, useEffect, createContext } from 'react';
import reviewsAPI from '../../../../api/reviews';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import restaurantsAPI from '../../../../api/restaurants';
import RestaurantContainer from '../../../../components/Restaurant';
import CommentSection from '../../../../components/CommentSection';
import PicturesWall from '../../../../components/ImgUploader';
import homeAPI from '../../../../api/home';
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const { TextArea } = Input;

const Review = ({ data, imgList, restaurant }) => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    homeAPI.getCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);
  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='my-5 mx-auto w-1/2 relative p-5'>
          {/* <h4 className='text-gray-400 ml-1'>
            {data.review.category.category_name}
          </h4>
          <h1>{data.review.title}</h1> */}
          <div className='p-6 pb-5 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
            <div className='mt-3 mb-3'>
              <h3>Title</h3>
              <Form.Item
                name='title'
                rules={[
                  {
                    required: true,
                    message: 'Please input title!',
                  },
                ]}>
                <Input
                  size='large'
                  style={{ fontSize: '1.5rem' }}
                  bordered={false}
                  placeholder='Input here...'
                />
              </Form.Item>
            </div>

            <Divider style={{ margin: '0.5rem' }} />

            <div className='mt-3 mb-3'>
              <h4 className='m-0' style={{ textAlign: 'left' }}>
                Category
              </h4>
              <br />
              <Form.Item name=''>
                <Select
                  // defaultValue={data.review.category.category_name}
                  placeholder={data.review.category.category_name}
                  bordered={false}>
                  {categories?.map((item) => (
                    <Option key={item.category_id} value={item.category_id}>
                      {item.category_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Divider style={{ margin: '0.5rem' }} />
            <div className='mt-3 mb-3'>
              <h4>Description</h4>
              <TextArea
                placeholder='Input here...'
                autoSize={{ minRows: 3, maxRows: 5 }}
                bordered={false}
              />
            </div>
          </div>

          {/* <Form.Item name='images'>
          <PicturesWall />
          </Form.Item> */}
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

          <div className='p-6 pb-5 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'></div>
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
  //   const categories = await homeAPI.getCategories().then((res) => {
  //     setCategories(res.data.categories);
  //   });
  return {
    data,
    imgList,
    restaurant,
    // categories,
  };
};
export default Review;
