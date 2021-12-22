import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
// import items from '../../../testcategories';
import MiniReview from '../../MiniReview';
const { TabPane } = Tabs;

const Categories = ({ items, categoriesData }) => {
  // const allCategories = ['all', ...new Set(items.map((item) => item.category))];

  useEffect(() => {
    console.log(items);
    console.log(categories);
  });
  const [categories, setCategories] = useState(categoriesData);
  const [reviews, setReviews] = useState(items);

  // const filterItems = (category) => {
  //   if (category === 'all') {
  //     setReviews(items);
  //   } else {
  //     const newItems = items.filter((item) => item.category === category);
  //     setReviews(newItems);
  //   }
  // };

  return (
    <>
      <h2 className='pt-10'>Discover</h2>
      <Tabs
        defaultActiveKey='0'
        centered
        // onTabClick={(index) => filterItems(categories[index])}>
      >
        {categories.map((category) => {
          return (
            <TabPane tab={category.category_name} key={category.category_id}>
              {<MiniReview reviews={reviews} />}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};
export default Categories;
