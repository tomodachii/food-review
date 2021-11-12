import Footer from '../../components/Footer';
import Header from '../../components/Header';

const FRLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default FRLayout;
