import HomeLayout from '../layouts/HomeLayout';
import React from 'react';
import Categories from '../components/Home/Categories';

export default function Home() {
  // const [toppageItems, setToppageItems] = useState();

  return (
    <HomeLayout>
      <div className='w-full m-0 bg-white'>
        {/* <ParallaxHeader /> */}
        <div className='w-3/4 mx-auto'>
          <Categories />
        </div>
      </div>
    </HomeLayout>
  );
}
