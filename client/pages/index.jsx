import HomeLayout from '../layouts/HomeLayout';
import React from 'react';
import Categories from '../components/Home/Categories';
import Menu from '../components/Menu';
import data from '../testreview';
import Recommendation from '../components/Home/Recommendation';
import homeAPI from '../api/home';
import { useRouter } from 'next/router';

export default function Home({ items, categoriesData }) {
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
  const router = useRouter;
  const categoriesData = await homeAPI
    .getCategories()
    .then((res) => res.data.categories)
    .catch((err) => {
      router.push('/404');
      console.log(err);
    });
  const items = await homeAPI
    .getData(0)
    .then((res) => res.data.reviews)
    .catch((err) => {
      router.push('/404');
      console.log(err);
    });
  return {
    props: {
      items,
      categoriesData,
    },
    revalidate: 1,
  };
}
