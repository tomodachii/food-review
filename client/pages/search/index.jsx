import SearchLayout from '../../layouts/SearchLayout';
import { useRouter } from 'next/dist/client/router';
import homeAPI from '../../api/home';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResult = ({ data }) => {
  const [homeData, setHomeData] = useState(data);
  const router = useRouter();

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
  }, []);

  return (
    <SearchLayout>
      <h1>{router.query.name}</h1>
      <h2>{'wtf' + homeData}</h2>
    </SearchLayout>
  );
};

SearchResult.getInitialProps = async (ctx) => {
  const data = (await homeAPI.getData(1)).data;

  return {
    data,
  };
};

export default SearchResult;
