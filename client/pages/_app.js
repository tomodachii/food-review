// import 'tailwindcss/tailwind.css';
import '../styles/styles.scss';
import 'antd/dist/antd.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tastie app</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>{' '}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
