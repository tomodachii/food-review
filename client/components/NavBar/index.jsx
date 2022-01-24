import { Menu, Button, notification, Dropdown, Avatar, Tooltip } from 'antd';
// const { Search } = Input;
import SearchBar from './SearchBarNav';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/dist/client/router';
import UserContext from '../../UserContext';
import { useContext } from 'react';
import userAPI from '../../api/users';
import loginAPI from '../../api/login';

const NavBar = ({ appName, type }) => {
  const router = useRouter();
  const [navItemStyle, setNavItemStyle] = useState('');
  const [avatarUser, setAvatarUser] = useState('');
  const {
    user,
    setUser,
    setUserLikedReviews,
    setUserSavedReviews,
    setUserWrittenReviews,
    loginModalOpen,
    setLoginModalOpen,
    registerModalOpen,
    setRegisterModalOpen,
  } = useContext(UserContext);

  useEffect(async () => {
    if (type === 'home') {
      setNavItemStyle(
        'text-white transition duration-300 ease-in-out hover:text-[#dd2f46] hover:-translate-1 hover:scale-110'
      );
    } else if (type === 'other') {
      setNavItemStyle(
        'text-[#272343] transition duration-300 ease-in-out hover:text-[#dd2f46] hover:-translate-1 hover:scale-110'
      );
    }
  }, []);

  useEffect(() => {
    if (!user) {
      userAPI.getUser().then((res) => {
        console.log(res.data.user);
        if (res.data?.user) {
          setUser(res.data.user);
        }
      });
    }
  }, [router]);

  // const onSearch = value => {}
  const handleWriteReview = async () => {
    if (user) {
      router.push('/reviews/create');
    } else {
      await setRegisterModalOpen(true);
      await openNotification('error', 'You have to login first');
    }
  };

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleLogout = async () => {
    await loginAPI
      .logout()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await openNotification('success', 'successfully logged out!');
    await setUser(null);
    await setUserLikedReviews([]);
    await setUserSavedReviews([]);
    await setUserWrittenReviews([]);
  };

  const userInformations = (
    <Menu className='rounded-2xl py-2 absolute transform -translate-x-1/2 left-1/2'>
      <Menu.Item key='0'>
        <p
          className='m-0'
          onClick={() => router.push(`/user/${user.username}`)}>
          Profile
        </p>
      </Menu.Item>
      <Menu.Item key='1'>
        <p className='m-0' onClick={handleLogout}>
          Logout
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <nav className='nav__container w-3/4 my-0 mx-auto flex flex-row items-center justify-between'>
        <h2
          className='inline cursor-pointer font-yujiboku'
          onClick={() => {
            router.push('/');
          }}>
          {appName}
        </h2>
        {type !== 'home' && <SearchBar />}
        <ul className='nav flex flex-row items-center justify-between mb-0'>
          <li className='nav__item p-5 text-white'>
            <Button
              icon={<FiEdit3 className='inline mr-2' />}
              type='primary'
              size='large'
              style={{ borderRadius: '1rem' }}
              onClick={handleWriteReview}>
              Write review
            </Button>
          </li>
          {user ? (
            <li className='rounded-full p-0 hover:shadow-xl'>
              <Dropdown
                overlay={userInformations}
                trigger={['click']}
                placement='bottomLeft'>
                <Tooltip title={user.userName}>
                  {/* {avatarUser ? (
                    <Avatar
                      size={45}
                      style={{
                        cursor: 'pointer',
                      }}
                      src={avatarUser}
                    />
                  ) : (
                    <Avatar
                      size={45}
                      style={{
                        backgroundColor: 'white',
                        cursor: 'pointer',
                      }}
                      src='/images/avatars/punpun.png'
                    />
                  )} */}
                  <div className='w-12 h-12 flex items-center'>
                    <img
                      onError={(e) => {
                        e.target.src = '/images/avatars/punpun.png';
                      }}
                      className='h-12 w-12 rounded-full object-cover'
                      src={user.avatar}
                    />
                  </div>
                </Tooltip>
              </Dropdown>
            </li>
          ) : (
            <>
              <li className='nav__item p-5 '>
                <button
                  className={navItemStyle}
                  onClick={() => setLoginModalOpen(true)}>
                  Login
                </button>
              </li>
              <li className='nav__item p-5 '>
                <button
                  className={navItemStyle}
                  onClick={() => setRegisterModalOpen(true)}>
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
    </>
  );
};

export default NavBar;
