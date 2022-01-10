import Item from './Item';

const ReviewContainer = ({ reviews, limit, imgList }) => {
  return (
    <div className='w-full'>
      {limit
        ? reviews
            .slice(0, limit)
            .map((review, index) => (
              <Item key={new Date().getTime().toString + index} data={review} />
            ))
        : reviews.map((review, index) => (
            <Item key={new Date().getTime().toString + index} data={review} />
          ))}
    </div>
  );
};

export default ReviewContainer;
