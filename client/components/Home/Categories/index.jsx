import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { useRouter } from 'next/router';
import MiniReview from '../../MiniReview';

import homeAPI from '../../../api/home';
import Loading from '../../Loading';
const { TabPane } = Tabs;

const Categories = ({ items, categoriesData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(2);
  const [reviews, setReviews] = useState(items);
  const handleSeeMore = async () => {
    await setLoading(true);
    await homeAPI
      .getData(page)
      .then((res) => {
        if (page === 1) setReviews([]);
        setReviews((prevState) => [...prevState, ...res.data.reviews]);
        setPage((prevState) => prevState + 1);
      })
      .catch((err) => {
        console.log(err);
        router.push('/404');
      });
    await setLoading(false);
  };

  const handleTabChange = async (id) => {
    await setLoading(true);
    setPage(1);
    await homeAPI
      .getDataByCategories(id)
      .then((res) => {
        console.log(res.data.reviews);
        setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.log(err);
        router.push('/404');
      });
    await setLoading(false);
  };

  return (
    <div className='w-full'>
      <h2 className='pt-10'>Discover</h2>
      <Tabs
        defaultActiveKey='0'
        centered
        // onTabClick={(index) => filterItems(categories[index])}>
        onChange={handleTabChange}>
        {categoriesData.map((category) => {
          return (
            <TabPane tab={category.category_name} key={category.category_id}>
              {
                <>
                  <Loading loading={loading} overlay={loading} />
                  <MiniReview reviews={reviews} />
                </>
              }
            </TabPane>
          );
        })}
      </Tabs>

      {reviews.length >= 16 && (
        <div className='text-center pb-10'>
          <Button
            size='large'
            type='primary'
            style={{ borderRadius: '2rem' }}
            onClick={handleSeeMore}>
            See More
          </Button>
        </div>
      )}
    </div>
  );
};
export default Categories;
