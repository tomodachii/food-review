import Item from './Item';
import { Button } from 'antd';
import homeAPI from '../../api/home';
import { useState } from 'react';
import Loading from '../Loading';

const ReviewContainer = ({ reviews, limit, seeMore }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [reviewList, setReviewList] = useState(reviews);
  const handleSeeMore = async () => {
    await setLoading(true);
    await homeAPI
      .getData(page)
      .then((res) => {
        setReviewList((prevState) => [...prevState, ...res.data.reviews]);
        console.log(reviewList);
        setPage((prevState) => prevState + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    await setLoading(false);
  };
  return (
    <div className='w-full'>
      {limit
        ? reviewList
            .slice(0, limit)
            .map((review, index) => (
              <Item key={new Date().getTime().toString + index} data={review} />
            ))
        : reviews.map((review, index) => (
            <Item key={new Date().getTime().toString + index} data={review} />
          ))}
      <Loading loading={loading} overlay={loading} />
      {seeMore && (
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

export default ReviewContainer;
