import FRLayout from '../../../layouts/FRLayout';
import Map from '../../../components/LeafletMap';
import { MdLocationOn } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { MdAccessTimeFilled } from 'react-icons/md';
import restaurantsAPI from '../../../api/restaurants';
import { useEffect } from 'react';
import ReviewContainer from '../../../components/Review';
import Slider from '../../../components/Review/Slider';

const Restaurant = ({ data, imgList }) => {
  useEffect(() => {
    // console.log(data);
    // console.log(imgList);
  }, []);

  // const gallery = imgList[0].map((img) => img.image_link);
  // console.log(gallery);

  return (
    <FRLayout>
      <div className='w-3/4 bg-gray-50 mx-auto'>
        <div className='my-4 bg-white rounded-xl shadow-md pl-6 pr-4 py-5'>
          <div className='flex'>
            <img
              className='w-20 h-20 rounded-lg flex-initial mt-4 mr-5'
              src={data.restaurant_image}
            />
            <div className='flex-initial mt-3'>
              <h3 className='font-sans'>{data.restaurant_name}</h3>
              <h5 className='-mt-2 text-red-500'>Ẩm thực</h5>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <AiFillStar />
            <p className=' mb-1 text-gray-500 m-0'>
              Rating:{' '}
              <b className='text-black'>
                {Math.round(data.restaurant_rating / 2)}
              </b>
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
          <div>
            <Slider data={imgList[0]} />
          </div>
        </div>

        <div className='w-full'>
          <div className='w-full h-[600px] rounded-lg'>
            <Map lat={21.01109167859198} lng={105.93397082593505} />
          </div>
        </div>
        <div className=''>
          <div className='mt-5 mb-3'>
            <p className='text-gray-500 text-xl font-semibold font-sans'>
              Review từ cộng đồng ({data.review.length})
            </p>
          </div>
          <ReviewContainer reviews={data.review} />
        </div>
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
  const imgList = await restaurantsAPI
    .getRestaurantImages(id)
    .then((res) => res.data.image)
    .catch((err) => {
      console.log(err);
    });
  return {
    data,
    imgList,
  };
};
export default Restaurant;
