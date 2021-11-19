const MiniReview = ({ reviews }) => {
  return (
    <div className='w-full review--mini__section p-12'>
      {reviews.map((review, index) => (
        <div
          className='relative w-full py-5 px-3 break-inside-avoid '
          key={new Date().getTime().toString + index}>
          <div className='review--mini bg-white relative w-full rounded-xl shadow-md border-2 border-grey-50'>
            <div className='w-3/4 review__img relative '>
              <img className='w-full rounded-xl shadow-md' src={review.img} />
            </div>
            <div className='relative review--mini__content p-5'>
              <p className='mb-3'>{review.title}</p>
              <h5 className='text-gray-400'>{review.description}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniReview;
