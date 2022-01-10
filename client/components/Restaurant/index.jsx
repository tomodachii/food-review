import Item from './Item';

const RestaurantContainer = ({ restaurants, limit }) => {
  return (
    <div className='w-full'>
      {limit
        ? restaurants
            .slice(0, limit)
            .map((restaurant, index) => (
              <Item
                key={new Date().getTime().toString + index}
                restaurant={restaurant}
              />
            ))
        : restaurants.map((restaurant, index) => (
            <Item
              key={new Date().getTime().toString + index}
              restaurant={restaurant}
            />
          ))}
    </div>
  );
};

export default RestaurantContainer;
