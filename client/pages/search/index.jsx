import FRLayout from '../../layouts/FRLayout';
import { useRouter } from 'next/dist/client/router';
import searchAPI from '../../api/search';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { Tabs } from 'antd';
import ReviewContainer from '../../components/Review';
import RestaurantContainer from '../../components/Restaurant';
import UserContainer from '../../components/User';
import Loading from '../../components/Loading';
const { TabPane } = Tabs;

const SearchResult = ({ data }) => {
  const [results, setResults] = useState(data);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [containerWidth, setContainerWidth] = useState('w-3/4');
  const [reviewResults, setReviewResults] = useState([]);
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentKey, setCurrentKey] = useState('');

  // const fetchData = async () => {
  //   await homeAPI
  //     .getData(1)
  //     .then((res) => {
  //       console.log(res);
  //       setHomeData(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleTabChange = async (key) => {
    setCurrentKey(key);
    if (key === 'all') {
      setContainerWidth('w-2/3');
    } else {
      setContainerWidth('w-2/3');
    }
    if (key === 'all') {
      await setLoading(true);
      await searchAPI
        .getResults(router.query.key)
        .then((res) => setResults(res.data))
        .catch((err) => {
          console.log(err);
          router.push('./404');
        });
      await setLoading(false);
    }
    if (key === 'reviews') {
      await setLoading(true);
      await searchAPI
        .getReviewResults(router.query.key)
        .then((res) => setReviewResults(res.data.reviews))
        .catch((err) => {
          console.log(err);
          router.push('./404');
        });
      await setLoading(false);
    }
    if (key === 'restaurants') {
      await setLoading(true);
      await searchAPI
        .getRestaurantResults(router.query.key)
        .then((res) => setRestaurantResults(res.data.restaurants))
        .catch((err) => {
          console.log(err);
          router.push('./404');
        });
      await setLoading(false);
    }
    if (key === 'users') {
      await setLoading(true);
      await searchAPI
        .getUserResults(router.query.key)
        .then((res) => setUserResults(res.data.users))
        .catch((err) => {
          console.log(err);
          router.push('./404');
        });
      await setLoading(false);
    }
  };

  useEffect(() => {
    handleTabChange(currentKey);
  }, [router.query.key]);

  return (
    <FRLayout>
      <div className={containerWidth + ' mx-auto'}>
        <div className='my-8'>
          <h5 className='text-center font-light'>Search result for</h5>
          <h2 className='text-center'>{router.query.key}</h2>
          <Loading loading={loading} overlay={loading} />
          <Tabs defaultActiveKey='1' centered onChange={handleTabChange}>
            <TabPane tab='All' key='all'>
              <RestaurantContainer
                restaurants={results.restaurants}
                limit={2}
              />
              <ReviewContainer reviews={results.reviews} limit={5} />
              <UserContainer users={results.users} limit={3} />
            </TabPane>
            <TabPane tab='Reviews' key='reviews'>
              <div className='mt-10'>
                <ReviewContainer reviews={reviewResults} />
              </div>
            </TabPane>
            <TabPane tab='Restaurants' key='restaurants'>
              <div className='mt-10'>
                <RestaurantContainer restaurants={restaurantResults} />
              </div>
            </TabPane>
            <TabPane tab='Users' key='users'>
              <UserContainer users={userResults} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </FRLayout>
  );
};

SearchResult.getInitialProps = async ({ query }) => {
  const { key } = query;
  const data = await searchAPI
    .getResults(key)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    data,
  };
};

export default SearchResult;
