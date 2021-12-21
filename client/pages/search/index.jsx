import FRLayout from '../../layouts/FRLayout';
import { useRouter } from 'next/dist/client/router';
import homeAPI from '../../api/home';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { Tabs } from 'antd';
import ReviewContainer from '../../components/Review';
import RestaurantContainer from '../../components/Restaurant';
import items from '../../testcategories';
const { TabPane } = Tabs;

const SearchResult = ({ data }) => {
  const [homeData, setHomeData] = useState(data);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [containerWidth, setContainerWidth] = useState('w-3/4');

  // const fetchData = async () => {
  //   await homeAPI
  //     .getData(1)
  //     .then((res) => {
  //       console.log(res);
  //       setHomeData(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleTabChange = (key) => {
    if (key === 'all') {
      setContainerWidth('w-3/4');
    } else {
      setContainerWidth('w-2/3');
    }
  };

  useEffect(() => {
    // fetchData();
    console.log(data);
    console.log(user);
  }, []);

  return (
    <FRLayout>
      {/* <h1>{router.query.name}</h1>
      <h2>{'wtf ' + homeData}</h2> */}
      <div className={containerWidth + ' mx-auto'}>
        <div className='my-8'>
          <h5 className='text-center font-light'>Search result for</h5>
          <h2 className='text-center'>{router.query.name}</h2>
          <Tabs defaultActiveKey='1' centered onChange={handleTabChange}>
            <TabPane tab='All' key='all'>
              <div className='mt-10'>Content of Tab Pane 1</div>
            </TabPane>
            <TabPane tab='Reviews' key='reviews'>
              <div className='mt-10'>
                <ReviewContainer reviews={items} />
              </div>
            </TabPane>
            <TabPane tab='Restaurants' key='restaurants'>
              <div className='mt-10'>
                <RestaurantContainer restaurants={items} />
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

SearchResult.getInitialProps = async (ctx) => {
  // const data = (await homeAPI.getData(1)).data;
  const data = 'noData';
  return {
    data,
  };
};

export default SearchResult;
