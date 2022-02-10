import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const Recommendation = ({ data }) => {
  const [imgList, setImgList] = useState(data);
  const [index, setIndex] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    // console.log(imgList);
    console.log(data);
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
            const { image, name, title, quote } = item;
            // console.log(quote);
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
                key={name}
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
                  src={image}
                  alt={name}
                />
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                  }}
                  className='flex flex-col justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-100 scale-95 rounded-3xl h-full w-full inset-0 z-50'>
                  <Title
                    level={2}
                    style={{ textAlign: 'center', color: 'white' }}>
                    {title}
                  </Title>
                  <Title
                    level={3}
                    style={{ textAlign: 'center', color: 'white' }}>
                    {quote}
                  </Title>
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    {quote}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Something text in here
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Something text in here 213
                  </Text>
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
            const { image, name } = item;
            let initPosition =
              'object-cover h-[65px] w-[70px] rounded-lg ransition duration-500 ease-in-out cursor-pointer hover:scale-110';
            let position = initPosition + ' opacity-50';
            if (itemIndex === index) {
              position = initPosition + ' opacity-1 border-red-500';
            }

            return (
              <img
                key={name}
                className={position}
                src={image}
                alt={name}
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
