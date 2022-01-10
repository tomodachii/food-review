import Item from './Item';

const UserContainer = ({ users, limit }) => {
  return (
    <div className='w-full'>
      {limit
        ? users
            .slice(0, limit)
            .map((user, index) => (
              <Item key={new Date().getTime().toString + index} user={user} />
            ))
        : users.map((user, index) => (
            <Item key={new Date().getTime().toString + index} user={user} />
          ))}
    </div>
  );
};

export default UserContainer;
