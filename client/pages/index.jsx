import HomeLayout from '../layouts/HomeLayout';
import React from 'react';
import Categories from '../components/Home/Categories';
import Menu from '../components/Menu';
import data from '../testreview';
import Recommendation from '../components/Home/Recommendation';
import homeAPI from '../api/home';

export default function Home({ items, categoriesData }) {
  // const [toppageItems, setToppageItems] = useState();

  return (
    <HomeLayout>
      <div className='w-full m-0 bg-white'>
        {/* <ParallaxHeader /> */}
        <div className='w-3/4 mx-auto pt-16'>
          <Recommendation data={data} />
          <Menu />
          <Categories items={items} categoriesData={categoriesData} />
        </div>
      </div>
    </HomeLayout>
  );
}

// Home.getInitialProps = async (ctx) => {
//   const items = (await homeAPI.getData(1)).data.reviews;
//   const categoriesData = (await homeAPI.getData(1)).data.categories;
//   return {
//     items,
//     categoriesData,
//   };
// };

export async function getStaticProps() {
  const items = (await homeAPI.getData(1)).data.reviews;
  const categoriesData = (await homeAPI.getData(1)).data.categories;
  return {
    props: {
      items,
      categoriesData,
    },
  };
}
