import { useRouter } from 'next/dist/client/router';

const Menu = () => {
  const router = useRouter();

  return (
    <>
      <h2 className='pb-5'>Collections</h2>
      <div className='flex items-center justify-between gap-8'>
        <div
          className='w-1/2 relative rounded-xl shadow-lg hover:shadow-2xl transition duration-400 ease-in-out'
          onClick={() => {
            router.push('/reviews');
          }}>
          <img className='rounded-xl cursor-pointer ' src='/images/bg.png ' />
          <h2 className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white cursor-pointer'>
            Reviews
          </h2>
        </div>
        <div
          className='w-1/2 relative rounded-xl shadow-lg hover:shadow-2xl transition duration-400 ease-in-out'
          onClick={() => {
            router.push('/restaurants');
          }}>
          <img className='rounded-xl cursor-pointer ' src='/images/bg.png ' />
          <h2 className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white cursor-pointer'>
            Restaurants
          </h2>
        </div>
      </div>
    </>
  );
};

export default Menu;
