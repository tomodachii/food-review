// import 'tailwindcss/tailwind.css';
import '../styles/styles.scss';
import 'antd/dist/antd.css';
import { useState } from 'react';
import Head from 'next/head';
import UserContext from '../UserContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginModalOpen,
        setLoginModalOpen,
        registerModalOpen,
        setRegisterModalOpen,
      }}>
      <Head>
        <title>Tastie app</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>{' '}
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
