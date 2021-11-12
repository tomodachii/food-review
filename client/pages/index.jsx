import ParallaxHeader from '../components/Home/ParallaxHeader';
import HomeLayout from '../layouts/HomeLayout';
import items from '../testcategories';
import React, { useState } from 'react';
import Categories from '../components/Home/Categories';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

export default function Home() {
  const [toppageItems, setToppageItems] = useState();
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setToppageItems(items);
    } else {
      const newItems = items.filter((item) => item.category === category);
      setToppageItems(newItems);
    }
  };

  return (
    <HomeLayout>
      <div className='w-full m-0'>
        {/* <ParallaxHeader /> */}
        <div className='w-3/5 mx-auto'>
          <Categories categories={categories} filterItems={filterItems} />
        </div>
      </div>
    </HomeLayout>
  );
}
