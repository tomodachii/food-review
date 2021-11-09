import { Head } from 'next/document';

const FRLayout = ({ children }) => {
  return (
    <>
      {/* <Head>
        <title>Tastie</title>
      </Head> */}
      {children}
      <div>Footer</div>
    </>
  );
};

export default FRLayout;
