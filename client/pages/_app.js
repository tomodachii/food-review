// import 'tailwindcss/tailwind.css';
import '../styles/styles.scss';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import UserContext from '../UserContext';
import { useRouter } from 'next/router';
import userAPI from '../api/users';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [userLikedReviews, setUserLikedReviews] = useState([]);
  const [userSavedReviews, setUserSavedReviews] = useState([]);
  const [userWrittenReviews, setUserWrittenReviews] = useState([]);

  useEffect(() => {
    if (!user) {
      userAPI.getLoginUser().then((res) => {
        if (res.data?.user) {
          setUser(res.data.user);
          userAPI
            .getUserLikedReviewsArray(res.data.user.user_id)
            .then((res) => {
              console.log('abcd:', res.data);
              setUserLikedReviews(res.data);
            })
            .catch((err) => {
              console.log('error');
              console.error(err);
            });
          userAPI
            .getUserSavedReviewsArray(res.data.user.user_id)
            .then((res) => {
              console.log('nigga', res.data);
              setUserSavedReviews(res.data);
            })
            .catch((err) => {
              console.log('error');
              console.error(err);
            });
        }
      });
    }
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginModalOpen,
        setLoginModalOpen,
        registerModalOpen,
        setRegisterModalOpen,
        userLikedReviews,
        setUserLikedReviews,
        userSavedReviews,
        setUserSavedReviews,
        userWrittenReviews,
        setUserWrittenReviews,
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
