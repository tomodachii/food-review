import { Button } from 'antd';
// const { Search } = Input;
import SearchBar from './SearchBarNav';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/dist/client/router';

const NavBar = ({ appName, type }) => {
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [navItemStyle, setNavItemStyle] = useState('');
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
        {type !== 'home' && type !== 'search' && <SearchBar />}
        <ul className='nav flex flex-row items-center justify-between mb-0'>
          <li className='nav__item p-5 text-white'>
            <Button
              icon={<FiEdit3 className='inline mr-2' />}
              type='primary'
              size='large'
              onClick={() => {
                router.push('/review/create');
              }}>
              Write review
            </Button>
          </li>
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
        </ul>
      </nav>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
    </>
  );
};

export default NavBar;
