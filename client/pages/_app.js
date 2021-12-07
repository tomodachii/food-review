// import 'tailwindcss/tailwind.css';
import '../styles/styles.scss';
import 'antd/dist/antd.css';
import { useState } from 'react';
import Head from 'next/head';
import UserContext from '../UserContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState('');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Head>
        <title>Tastie app</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>{' '}
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
