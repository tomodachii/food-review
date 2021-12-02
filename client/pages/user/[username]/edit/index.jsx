import FRLayout from '../../../../layouts/FRLayout';
import { Input } from 'antd';

const UserEdit = () => {
  return (
    <FRLayout>
      <div className='w-3/4 mx-auto'>
        <h1>Edit</h1>
        <input type='text' placeholder='Edit username' />
        <Input />
      </div>
    </FRLayout>
  );
};

export default UserEdit;
