import React, { useState } from 'react';
import { Tabs } from 'antd';
import FRLayout from '../../../../layouts/FRLayout';
import ProfileEdit from '../../../../components/User/ProfileEdit';
import PasswordChange from '../../../../components/User/PasswordChange';
import items from '../../../../testcategories';

const { TabPane } = Tabs;

const UserEdit = () => {
  const [userInfo, setUserInfo] = useState(items);
  return (
    <>
      <FRLayout>
        <div
          className='w-3/4 mx-auto border rounded-md m-8 bg-white'
          style={{ height: 900 }}>
          <div className='my-6'>
            <Tabs tabPosition='left'>
              <TabPane tab='Edit Profile' key='1'>
                <ProfileEdit userInfo={userInfo[0]} />
              </TabPane>
              <TabPane tab='Change Password' key='2'>
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
