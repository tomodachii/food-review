import Footer from '../../components/Footer';
import Header from '../../components/Header';

const FRLayout = ({ children }) => {
  return (
    <>
      <Header type='other' />
      {children}
      <Footer />
    </>
  );
};

export default FRLayout;
