// import HomeFooter from '../../components/Home/MenuFooter';
import HomeFooter from '../../components/Footer';
import ParallaxHeader from '../../components/Home/ParallaxHeader';

const HomeLayout = ({ children }) => {
  return (
    <>
      {/* <Head>
        <title>Tastie</title>
      </Head> */}
      <ParallaxHeader />
      {children}
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
