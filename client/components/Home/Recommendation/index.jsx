import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { AiTwotoneStar } from 'react-icons/ai';

const { Text, Title } = Typography;

const Recommendation = ({ data }) => {
  const router = useRouter();
  const [imgList, setImgList] = useState(data);
  const [index, setIndex] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    // console.log(data);
    const lastIndex = imgList.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, imgList]);

  useEffect(() => {
    let slider;
    if (!stop) {
      slider = setInterval(() => {
        setIndex(index + 1);
      }, 1800);
    }
    return () => clearInterval(slider);
  }, [index, stop]);

  return (
    <>
      <h2 className='pb-5'>Our Recommendation</h2>
      <div className='my-5 mx-auto w-full relative'>
        <div className='w-3/4 mx-auto h-[600px] overflow-hidden relative'>
          {imgList.map((item, itemIndex) => {
            const {
              restaurant_image,
              restaurant_name,
              openingTime,
              phoneNumber,
              restaurant_rating,
              restaurant_id,
            } = item;
            // console.log(item);
            let initPosition =
              'mx-auto w-full h-full absolute top-0 left-0 transition duration-300 ease-in-out';
            let position = initPosition + ' opacity-0 translate-x-full';
            if (itemIndex === index) {
              position = initPosition + ' opacity-1 translate-x-0';
            }
            if (
              itemIndex === index - 1 ||
              (index === 0 && itemIndex === imgList.length - 1)
            ) {
              position = initPosition + ' opacity-0 -translate-x-full';
            }
            return (
              <div
                className={position}
                key={restaurant_name}
                onMouseOver={() => setStop(true)}
                onMouseOut={() => setStop(false)}>
                <img
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                  className=' object-cover h-full w-full scale-95 rounded-3xl shadow-lg cursor-pointer hover:shadow-xl'
                  src={restaurant_image}
                  onError={(e) => (e.target.src = 'images/avatars/punpun.png')}
                />
                <div
                  onClick={() => router.push(`/restaurants/${restaurant_id}`)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                  }}
                  className='cursor-pointer flex flex-col justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-100 scale-95 rounded-3xl h-full w-full inset-0 z-50'>
                  <h1 className='pb-3 text-center text-white font-yujiboku px-5'>
                    {restaurant_name}
                  </h1>
                  <Title
                    level={3}
                    style={{ textAlign: 'center', color: 'white' }}>
                    {openingTime}
                  </Title>
                  <h4 className='p-3 text-center text-white'>{phoneNumber}</h4>
                  <div className='mt-3 flex items-center gap-1 p-1 rounded-xl bg-red-600 mx-auto'>
                    <h4 className='p-1 m-0 text-white'>
                      {Math.round(restaurant_rating / 2)}
                    </h4>
                    <AiTwotoneStar className=' text-white' />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className='absolute top-1/2 -translate-y-1/2 left-2 w-18 h-18 grid place-items-center'
          onClick={() => setIndex(index - 1)}>
          <FiChevronLeft className='text-5xl m-0 transition duration-300 ease-in-out hover:text-red-600 hover:scale-110 active:scale-90' />
        </button>
        <button
          className='absolute top-1/2 -translate-y-1/2 right-2 w-18 h-18 grid place-items-center'
          onClick={() => setIndex(index + 1)}>
          <FiChevronRight className='text-5xl m-0 transition duration-300 ease-in-out hover:text-red-600 hover:scale-110 active:scale-90' />
        </button>

        <div className='pt-8 flex items-center justify-center gap-4'>
          {imgList.map((item, itemIndex) => {
            const { restaurant_image, restaurant_name } = item;
            let initPosition =
              'object-cover h-[65px] w-[70px] rounded-lg ransition duration-500 ease-in-out cursor-pointer hover:scale-110';
            let position = initPosition + ' opacity-50';
            if (itemIndex === index) {
              position = initPosition + ' opacity-1 border-red-500';
            }

            return (
              <img
                key={restaurant_name}
                className={position}
                src={restaurant_image}
                onError={(e) => (e.target.src = 'images/avatars/punpun.png')}
                onClick={() => setIndex(itemIndex)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Recommendation;
