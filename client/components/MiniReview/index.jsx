import Item from './Item';

const MiniReview = ({ reviews, col, flag }) => {
  const column =
    col === 3 ? ' review__section-col-3' : ' review__section-col-4';
  return (
    <div className={'w-full p-12 pb-8' + column}>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) =>
          flag ? (
            <Item key={new Date().getTime().toString + index} data={review} />
          ) : (
            <Item
              key={new Date().getTime().toString + index}
              data={review}
              flag={true}
            />
          )
        )
      ) : (
        <h2 className='text-red-600 '>NO DATA @_@</h2>
      )}
    </div>
  );
};

export default MiniReview;
