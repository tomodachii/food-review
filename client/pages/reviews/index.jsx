import FRLayout from '../../layouts/FRLayout';
import ReviewContainer from '../../components/Review';
// import items from '../../testcategories';
import { useState } from 'react';
import Filter from '../../components/Filter';
import { useRouter } from 'next/router';
import homeAPI from '../../api/home';
import reviewsAPI from '../../api/reviews';

const Reviews = ({ items }) => {
  const [reviews, setReviews] = useState(items);
  return (
    <FRLayout>
      <div className='w-3/4 bg-cover mx-auto mt-5 rounded-xl bg-white shadow'>
        <div className='bg-home-background bg-cover h-96 w-full rounded-t-xl relative'>
          <h1 className='font-yujiboku text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            Reviews
          </h1>
        </div>
        <div className='flex flex-col my-5 items-center'>
          <h3>100 Posts</h3>
          <p className='text-gray-500 text-center'>
            If he doesn't appreciate your fruits jokes, <br /> you have to let
            that mango
          </p>
        </div>
      </div>
      <div className='w-3/4 mx-auto grid grid-cols-10 gap-5'>
        <div className='col-span-3'>
          <Filter />
        </div>
        <div className='col-span-7'>
          <ReviewContainer reviews={reviews} />
        </div>
      </div>
    </FRLayout>
  );
};

export async function getStaticProps() {
  const router = useRouter;
  const items = await homeAPI
    .getData(0)
    .then((res) => res.data.reviews)
    .catch((err) => {
      router.push('/404');
      console.log(err);
    });

  return {
    props: {
      items,
    },
    revalidate: 1,
  };
}

export default Reviews;
