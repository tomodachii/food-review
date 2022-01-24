import FRLayout from '../../../layouts/FRLayout';
import Tablist from '../../../components/User/Tablist';
import UserContext from '../../../UserContext';
import { useEffect, useContext } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import userAPI from '../../../api/users';

const User = ({ data, writtenReviews, savedReviews }) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // console.log(user.username === data.username);
    console.log(data);
  }, []);

  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='w-3/4 mx-auto py-10 '>
          <div className='w-2/3 mx-auto flex items-center gap-10 mb-8'>
            <div className=''>
              <img
                onError={(e) => {
                  e.target.src = '../../images/avatars/punpun.png';
                }}
                className='block w-[220px] h-[220px] rounded-full mx-auto'
                src={data.avatar}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-5 items-center'>
                <h2 className='m-0 overflow-hidden'>{data.displayName}</h2>
                {user && data.username === user.username && (
                  <Button
                    type='default'
                    size='large'
                    onClick={() => router.push(`/user/${data.username}/edit`)}>
                    Edit Profile
                  </Button>
                )}
              </div>
              <h3 className='m-0'>@{data.username}</h3>
              <p>{writtenReviews.length} posts</p>
            </div>
          </div>
          <Tablist items={[writtenReviews, savedReviews]} />
        </div>
      </div>
    </FRLayout>
  );
};

User.getInitialProps = async ({ query }) => {
  const { username } = query;
  const data = await userAPI
    .getUser(username)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const writtenReviews = await userAPI
    .getUserWrittenReviews(data.user_id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const savedReviews = await userAPI
    .getUserSavedReviews(data.user_id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    data,
    writtenReviews,
    savedReviews,
  };
};
export default User;
