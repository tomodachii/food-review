import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function Categories({ categories, filterItems }) {
  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <h2>Discover</h2>
      <Tabs defaultActiveKey='1' centered onChange={callback}>
        {categories.map((category, index) => {
          return (
            <TabPane
              tab={category}
              key={index}
              onClick={() => filterItems(category)}>
              {category}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
}

export default Categories;
