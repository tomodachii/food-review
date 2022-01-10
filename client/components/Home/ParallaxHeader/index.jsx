import NavBar from '../../NavBar';

const ParallaxHeader = () => {
  return (
    <div className='h-screen bg-home-background bg-cover bg-fixed'>
      <NavBar appName='' type='home' />
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        <h1 className='text-white mt-5 text-center text-8xl font-yujiboku'>
          Tastie
        </h1>
        <h3 className='text-white mt-5 text-center'>
          Discover the best food and drink in Ha Noi
        </h3>
        <input
          type='text'
          className='search-bar bg-search-background'
          placeholder='Search ...'
        />
      </div>
    </div>
  );
};

export default ParallaxHeader;
