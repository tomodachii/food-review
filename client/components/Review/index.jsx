import Item from './Item';

const ReviewContainer = ({ reviews }) => {
  return (
    <div className='w-full'>
      {reviews.map((review, index) => (
        <Item key={new Date().getTime().toString + index} data={review} />
      ))}
    </div>
  );
};

export default ReviewContainer;
