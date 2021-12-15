import HomeLayout from '../layouts/HomeLayout';
import React from 'react';
import Categories from '../components/Home/Categories';
import Menu from '../components/Menu';
import data from '../testreview';
import Recommendation from '../components/Home/Recommendation';

export default function Home() {
  // const [toppageItems, setToppageItems] = useState();

  return (
    <HomeLayout>
      <div className='w-full m-0 bg-white'>
        {/* <ParallaxHeader /> */}
        <div className='w-3/4 mx-auto pt-16'>
          <Recommendation data={data} />
          <Menu />
          <Categories />
        </div>
      </div>
    </HomeLayout>
  );
}
