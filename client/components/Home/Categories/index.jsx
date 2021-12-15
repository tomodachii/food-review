import React, { useState } from 'react';
import { Tabs } from 'antd';
import items from '../../../testcategories';
import MiniReview from '../../MiniReview';
const { TabPane } = Tabs;

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const Categories = () => {
  const [categories, setCategories] = useState(allCategories);
  const [reviews, setReviews] = useState(items);

  const filterItems = (category) => {
    if (category === 'all') {
      setReviews(items);
    } else {
      const newItems = items.filter((item) => item.category === category);
      setReviews(newItems);
    }
  };

  return (
    <>
      <h2 className='pt-10'>Discover</h2>
      <Tabs
        defaultActiveKey='0'
        centered
        onTabClick={(index) => filterItems(categories[index])}>
        {categories.map((category, index) => {
          return (
            <TabPane tab={category} key={index}>
              {<MiniReview reviews={reviews} />}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default Categories;
