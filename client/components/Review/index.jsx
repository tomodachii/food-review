import Item from './Item';

const ReviewContainer = ({ reviews }) => {
  return (
    <div className='w-full p-12'>
      {reviews.map((review, index) => (
        <Item key={new Date().getTime().toString + index} review={review} />
      ))}
    </div>
  );
};

export default ReviewContainer;
