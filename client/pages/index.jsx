import Head from 'next/head';
import ParallaxHeader from '../components/Home/ParallaxHeader';
import FRLayout from '../layouts/FRLayout';
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
    <FRLayout>
      <div className='w-full m-0'>
        <ParallaxHeader />
        <Categories categories={categories} filterItems={filterItems} />
      </div>
    </FRLayout>
  );
}
