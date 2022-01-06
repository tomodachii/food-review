import { Button, Input } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Search } = Input;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: `/search/`,
        query: { key: inputValue },
      });
    }
  };

  return (
    <div className='w-full relative'>
      <div className=' border-indigo-600 w-1/4 transition-width duration-300 ease-in-out focus-within:w-3/4 pl-8'>
        <Input
          bordered='false'
          allowClear
          placeholder='Search...'
          prefix={<SearchOutlined />}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onEnter}
          size='large'
          style={{ outline: 'none' }}></Input>
      </div>
    </div>
  );
};

export default SearchBar;
