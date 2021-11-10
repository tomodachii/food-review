import './style.module.scss';
const HomeNav = () => {
  return (
    <nav className='nav__container w-4/5 my-0 mx-auto flex flex-row items-center justify-between'>
      <div className='img'></div>
      <ul className='nav flex flex-row items-center justify-between'>
        <li className='nav__item p-5 text-white'>
          <button>Write review</button>
        </li>
        <li className='nav__item p-5 text-white'>
          <button>Login</button>
        </li>
        <li className='nav__item p-5 text-white'>
          <button>Sign up</button>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
