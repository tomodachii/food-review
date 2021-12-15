import FRLayout from '../../layouts/FRLayout';
import ReviewContainer from '../../components/Review';
import items from '../../testcategories';
import { useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState(items);
  return (
    <FRLayout>
      <div className='w-3/4 mx-auto grid grid-cols-10'>
        <div className='col-span-3'></div>
        <div className='col-span-7'>
          <ReviewContainer reviews={reviews} />
        </div>
      </div>
    </FRLayout>
  );
};

export default Reviews;
