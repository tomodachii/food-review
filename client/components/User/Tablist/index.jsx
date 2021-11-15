import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import items from '../../../testcategories';
import MiniReview from '../../MiniReview';
import { BsGrid3X3GapFill, BsBookmarkFill } from 'react-icons/bs';
const { TabPane } = Tabs;

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const Tablist = () => {
  const [tabs, setTabs] = useState(['posts', 'saved']);
  const [reviews, setReviews] = useState(items);

  // const filterItems = (category) => {
  //   if (category === 'all') {
  //     setReviews(items);
  //   } else {
  //     const newItems = items.filter((item) => item.category === category);
  //     setReviews(newItems);
  //   }
  // };
  useEffect;

  return (
    <>
      <Tabs
        defaultActiveKey='0'
        centered
        // onTabClick={(index) => filterItems(categories[index])}
      >
        {tabs.map((tab, index) => {
          return (
            <TabPane
              tab={
                tab == 'posts' ? (
                  <span>
                    <BsGrid3X3GapFill className='inline mx-2' />
                    {tab.toUpperCase()}
                  </span>
                ) : (
                  <span>
                    <BsBookmarkFill className='inline mx-2' />
                    {tab.toUpperCase()}
                  </span>
                )
              }
              key={index}>
              {<MiniReview reviews={reviews} />}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default Tablist;
