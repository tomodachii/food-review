import FRLayout from '../../../layouts/FRLayout';
// import Map from '../../../components/LeafletMap';
import { MdLocationOn } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { MdAccessTimeFilled } from 'react-icons/md';
import restaurantsAPI from '../../../api/restaurants';
import reviewsAPI from '../../../api/reviews';
import { useEffect } from 'react';
import ReviewContainer from '../../../components/Review';

const Restaurant = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <FRLayout>
      <div className='w-3/4 bg-gray-50 mx-auto'>
        <div className='my-4 bg-white rounded-xl shadow-md pl-6 py-5'>
          <div className='flex'>
            {/* <div className='flex-initial'> */}
            <img
              className='w-20 h-20 rounded-lg flex-initial mt-4 mr-5'
              src={data.restaurant_image}
            />
            {/* </div> */}
            <div className='flex-initial mt-3'>
              <h3 className='font-sans'>{data.restaurant_name}</h3>
              <h5 className='-mt-2 text-red-500'>Ẩm thực</h5>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <AiFillStar />
            <p className=' mb-1 text-gray-500 m-0'>
              Rating: <b className='text-black'>{data.restaurant_rating / 5}</b>
              /5
            </p>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <MdLocationOn />
            <p className=' mb-1 text-gray-500 m-0'>
              Address: {data.address.address}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <AiFillPhone />
            <p className=' mb-1 text-gray-500 m-0'>
              Contact: {data.phoneNumber}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <MdAccessTimeFilled />
            <p className=' mb-1 text-gray-500 m-0'>Time: {data.openingTime}</p>
          </div>
        </div>
        <div className='mt-5 mb-3'>
          <p className='text-gray-500 text-xl font-semibold font-sans'>
            Review từ cộng đồng ({data.review.length})
          </p>
        </div>
        <ReviewContainer reviews={data.review} />
      </div>
    </FRLayout>
  );
};

Restaurant.getInitialProps = async ({ query }) => {
  const { id } = query;
  const data = await restaurantsAPI
    .getRestaurant(id)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  // const imgList =
  const imgList = await reviewsAPI
    .getReviewImages(id)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      router.push('/404');
    });
  return {
    data,
  };
};
export default Restaurant;
