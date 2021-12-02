import Footer from '../../components/Footer';
import Header from '../../components/Header';

const SearchLayout = ({ children }) => {
  return (
    <>
      <Header type='search' />
      {children}
      <Footer />
    </>
  );
};

export default SearchLayout;
