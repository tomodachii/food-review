import React, { useState } from 'react';
import { Tabs } from 'antd';
import FRLayout from '../../../../layouts/FRLayout';
import ProfileEdit from './ProfileEdit';
import PasswordChange from './PasswordChange';
import items from '../../../../testcategories';

const { TabPane } = Tabs;


const UserEdit = () => {
  const [userInfo, setUserInfo] = useState(items);
  return (
    <>
      <FRLayout>
        <div className='w-3/4 mx-auto border rounded-md m-8' style={{ height: 900 }}>
          <div className='m-6' >
            <Tabs tabPosition='left'>
              <TabPane tab="Chỉnh Sửa Profile" key="1">
                <ProfileEdit userInfo={userInfo[0]} />
              </TabPane>
              <TabPane tab="Đổi Mật Khẩu" key="2">
                <PasswordChange />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </FRLayout>

    </>
  );
};


export default UserEdit;
