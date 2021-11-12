import './style.module.scss';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import LoginModal from '../Home/LoginModal';
import { FiEdit3 } from 'react-icons/fi';

const HomeNav = ({ appName, type }) => {
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

  return (
    <>
      <nav className='nav__container w-3/5 my-0 mx-auto flex flex-row items-center justify-between'>
        <h2 className='inline font-yujiboku'>{appName}</h2>
        <ul className='nav flex flex-row items-center justify-between mb-0'>
          <li className='nav__item p-5 text-white'>
            <Button
              icon={<FiEdit3 className='inline mr-2' />}
              type='primary'
              size='large'>
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
            <button className={navItemStyle}>Register</button>
          </li>
        </ul>
      </nav>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
    </>
  );
};

export default HomeNav;
