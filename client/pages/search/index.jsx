import SearchLayout from '../../layouts/SearchLayout';
import { useRouter } from 'next/dist/client/router';
import homeAPI from '../../api/home';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const SearchResult = ({ data }) => {
  const [homeData, setHomeData] = useState(data);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  // const fetchData = async () => {
  //   await homeAPI
  //     .getData(1)
  //     .then((res) => {
  //       console.log(res);
  //       setHomeData(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  useEffect(() => {
    // fetchData();
    console.log(data);
    console.log(user);
  }, []);

  return (
    <SearchLayout>
      {/* <h1>{router.query.name}</h1>
      <h2>{'wtf ' + homeData}</h2> */}
      <div className='w-3/4 mx-auto'>
        <div className='my-8'>
          <h5 className='text-center font-light'>Search result for</h5>
          <h2 className='text-center'>{router.query.name}</h2>
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Tab 1' key='1'>
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab='Tab 2' key='2'>
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab='Tab 3' key='3'>
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab='Tab 4' key='4'>
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </SearchLayout>
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
