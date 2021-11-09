import HomeNav from '../HomeNav';

const ParallaxHeader = () => {
  return (
    <div className='h-screen bg-home-background bg-cover bg-fixed'>
      <HomeNav />
      <h1 className='text-white mt-5 text-center before:w-[120px] before:h-[2px] before:text-white'>
        Tastie
      </h1>
    </div>
  );
};

export default ParallaxHeader;
