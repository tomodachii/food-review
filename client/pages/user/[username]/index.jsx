import FRLayout from '../../../layouts/FRLayout';
import Tablist from '../../../components/User/Tablist';
import UserContext from '../../../UserContext';
import { useEffect, useContext } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const User = ({ username }) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log('user' + user);
    console.log(username);
  }, []);

  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='w-3/4 mx-auto py-10 '>
          <div className='w-2/3 mx-auto flex items-center gap-10 mb-8'>
            <div className=''>
              <img
                className='block w-[220px] h-[220px] rounded-full mx-auto'
                src='https://picsum.photos/500'
              />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-5 items-center'>
                <h2 className='m-0 overflow-hidden'>title</h2>
                {user && username === user.username && (
                  <Button
                    type='default'
                    size='large'
                    onClick={() => router.push(`/user/${username}/edit`)}>
                    Edit Profile
                  </Button>
                )}
              </div>
              <p>20 posts</p>
            </div>
          </div>
          {/* <Tablist /> */}
        </div>
      </div>
    </FRLayout>
  );
};

User.getInitialProps = async ({ query }) => {
  const { username } = query;
  // const data = (await reviewsAPI.getReview(id)).data;
  return {
    username,
  };
};
export default User;
