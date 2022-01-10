import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import MiniReview from '../../MiniReview';
import { BsGrid3X3GapFill, BsBookmarkFill } from 'react-icons/bs';
const { TabPane } = Tabs;

const Tablist = ({ items }) => {
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
              {<MiniReview reviews={items[index]} flag={true} />}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default Tablist;
