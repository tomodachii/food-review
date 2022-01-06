import FRLayout from '../../layouts/FRLayout';
import RestaurantContainer from '../../components/Restaurant';
import items from '../../testcategories';
import { useState } from 'react';
import Filter from '../../components/Filter';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState(items);
  return (
    <FRLayout>
      <div className='w-3/4 bg-cover mx-auto mt-5 rounded-xl bg-white shadow'>
        <div className='bg-home-background bg-cover h-96 w-full rounded-t-xl relative'>
          <h1 className='font-yujiboku text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            Restaurant
          </h1>
        </div>
        <div className='flex flex-col my-5 items-center'>
          <h3>100 Places</h3>
          <p className='text-gray-500 text-center'>
            I'm a crepe <br />
            I'm a weirdough <br />
            What the hell am I doughing here <br />
            I donut belong here <br />
          </p>
        </div>
      </div>
      <div className='w-3/4 mx-auto grid grid-cols-10 gap-5'>
        <div className='col-span-3'>
          <Filter options={['rating', 'sort']} />
        </div>
        <div className='col-span-7'>
          <RestaurantContainer restaurants={restaurants} />
        </div>
      </div>
    </FRLayout>
  );
};

export default Restaurants;
