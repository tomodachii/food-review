import Item from './Item';

const RestaurantContainer = ({ restaurants, limit, disableReview }) => {
  return (
    <div className='w-full'>
      {limit
        ? restaurants
            .slice(0, limit)
            .map((restaurant, index) => (
              <Item
                key={new Date().getTime().toString + index}
                restaurant={restaurant}
                disableReview={disableReview}
              />
            ))
        : restaurants.map((restaurant, index) => (
            <Item
              key={new Date().getTime().toString + index}
              restaurant={restaurant}
              disableReview={disableReview}
            />
          ))}
    </div>
  );
};

export default RestaurantContainer;
