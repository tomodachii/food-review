import { useEffect } from 'react';

const Item = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className='w-full p-6 mb-5 bg-white rounded-xl transition duration-300 ease-in-out shadow hover:shadow-xl cursor-pointer'>
      <div className='flex items-center gap-5 justify-between'>
        <div className='flex items-center gap-5'>
          <img
            src={user.avatar}
            className='rounded-full h-16 w-16'
            onError={(e) => {
              console.log(e);
              e.target = '../images/avatars/punpun.png';
            }}
          />
          <div>
            <h4 className='m-0 mb-2 hover:text-red-700 transition duration-300 ease-in-out'>
              {user.username}
            </h4>
            <h5 className='m-0 text-gray-500'>{user.email}</h5>
          </div>
        </div>
        <div>0 posts</div>
      </div>
    </div>
  );
};

export default Item;
