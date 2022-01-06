import FRLayout from '../../layouts/FRLayout';
import { useRouter } from 'next/dist/client/router';
import searchAPI from '../../api/search';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { Tabs } from 'antd';
import ReviewContainer from '../../components/Review';
import RestaurantContainer from '../../components/Restaurant';
import Loading from '../../components/Loading';
const { TabPane } = Tabs;

const SearchResult = ({ data }) => {
  const [homeData, setHomeData] = useState(data);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [containerWidth, setContainerWidth] = useState('w-3/4');
  const [reviews, setReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (key === 'all') {
      setContainerWidth('w-3/4');
    } else {
      setContainerWidth('w-2/3');
    }
    await setLoading(true);
    await searchAPI
      .getReviewResults(router.query.key)
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => {
        console.log(err);
        router.push('./404');
      });
    await setLoading(false);
  };

  useEffect(() => {
    // fetchData();
    console.log(data);
    console.log(user);
  }, []);

  return (
    <FRLayout>
      <div className={containerWidth + ' mx-auto'}>
        <div className='my-8'>
          <h5 className='text-center font-light'>Search result for</h5>
          <h2 className='text-center'>{router.query.key}</h2>
          <Loading loading={loading} overlay={loading} />
          <Tabs defaultActiveKey='1' centered onChange={handleTabChange}>
            <TabPane tab='All' key='all'>
              <div className='mt-10'>Content of Tab Pane 1</div>
            </TabPane>
            <TabPane tab='Reviews' key='reviews'>
              <div className='mt-10'>
                <ReviewContainer reviews={reviews} />
              </div>
            </TabPane>
            <TabPane tab='Restaurants' key='restaurants'>
              <div className='mt-10'>
                <RestaurantContainer restaurants={restaurants} />
              </div>
            </TabPane>
            <TabPane tab='Users' key='users'>
              <div className='mt-10'>Content of Tab Pane 3</div>
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
