import { LoadingOutlined } from '@ant-design/icons';
import { FaCog } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { Spin } from 'antd';
import React from 'react';

// export const loadingIcon = (
//   // <LoadingOutlined style={{ fontSize: 30, color: '#dd2f46' }} spin />
//   <LoadingOutlined style={{ fontSize: 24, color: '#dd2f46' }} spin />
// );

export const loadingIcon = (
  // <LoadingOutlined style={{ fontSize: 30, color: '#dd2f46' }} spin />
  <ImSpinner2
    className='spinner'
    style={{ fontSize: '2rem', color: '#dd2f46' }}
  />
);

function Loading(props) {
  return (
    <div
      className='overlay relative inset-0 h-full w-full'
      style={{ display: `${props.overlay ? 'block' : 'none'}` }}>
      <Spin
        spinning={props.loading ?? true}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        indicator={loadingIcon}
      />
    </div>
  );
}

export default Loading;
