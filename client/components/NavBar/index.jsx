import { Button, notification } from 'antd';
// const { Search } = Input;
import SearchBar from './SearchBarNav';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/dist/client/router';
import UserContext from '../../UserContext';
import { useContext } from 'react';

const NavBar = ({ appName, type }) => {
  const router = useRouter();
  const [navItemStyle, setNavItemStyle] = useState('');
  const {
    user,
    setUser,
    loginModalOpen,
    setLoginModalOpen,
    registerModalOpen,
    setRegisterModalOpen,
  } = useContext(UserContext);

  useEffect(() => {
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

  // const onSearch = value => {}
  const handleWriteReview = async () => {
    if (user) {
      router.push('/review/create');
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
              onClick={handleWriteReview}>
              Write review
            </Button>
          </li>
          {user ? (
            <li className='text-white'>{'Hello ' + user.username}</li>
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
