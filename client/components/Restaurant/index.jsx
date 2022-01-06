import Item from './Item';

const RestaurantContainer = ({ restaurants }) => {
  return (
    <div className='w-full'>
      {restaurants.map((restaurant, index) => (
        <Item
          key={new Date().getTime().toString + index}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantContainer;
