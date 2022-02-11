import HomeLayout from '../layouts/HomeLayout';
import React, { useContext, useEffect } from 'react';
import Categories from '../components/Home/Categories';
import Menu from '../components/Menu';
import data from '../testreview';
import Recommendation from '../components/Home/Recommendation';
import homeAPI from '../api/home';
import userAPI from '../api/users';
import UserContext from '../UserContext';
import { useRouter } from 'next/router';

export default function Home({ items, categoriesData, trends }) {
  return (
    <HomeLayout>
      <div className='w-full m-0 bg-white'>
        {/* <ParallaxHeader /> */}
        <div className='w-3/4 mx-auto pt-16'>
          <Recommendation data={trends} />
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
  const categoriesData = await homeAPI
    .getCategories()
    .then((res) => res.data.categories)
    .catch((err) => console.log(err));
  const items = await homeAPI
    .getData(1)
    .then((res) => res.data.reviews)
    .catch((err) => console.log(err));
  const trends = await homeAPI
    .getTrends()
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    props: {
      items,
      categoriesData,
      trends,
    },
    revalidate: 1,
  };
}
