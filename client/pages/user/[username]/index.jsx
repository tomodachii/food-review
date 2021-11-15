import FRLayout from '../../../layouts/FRLayout';
import Tablist from '../../../components/User/Tablist';

const User = () => {
  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='w-3/4 mx-auto py-10 '>
          <div className='w-full flex justify-between mb-8'>
            <div className='w-2/5'>
              <img
                className='block w-[220px] h-[220px] rounded-full mx-auto'
                src='https://picsum.photos/500'
              />
            </div>
            <div className='w-3/5'>
              <h2 className='mt-5'>title</h2>
              <p>20 posts</p>
            </div>
          </div>
          <Tablist />
        </div>
      </div>
    </FRLayout>
  );
};

export default User;
