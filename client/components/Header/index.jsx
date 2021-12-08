import NavBar from '../NavBar';

const Header = ({ type }) => {
  return (
    <div className='w-full border-b-2 bg-white'>
      <NavBar appName='Tastie' type={type} />
    </div>
  );
};

export default Header;
