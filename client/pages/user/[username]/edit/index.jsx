import React from 'react';
import { Tabs } from 'antd';
import FRLayout from '../../../../layouts/FRLayout';
import ProfileEdit from '../../../../components/User/ProfileEdit';
import PasswordChange from '../../../../components/User/PasswordChange';
import userAPI from '../../../../api/users';

const { TabPane } = Tabs;

const UserEdit = ({ data }) => {
  return (
    <>
      <FRLayout>
        <div
          className='w-3/4 mx-auto border rounded-md m-8 bg-white'
          style={{ height: 900 }}>
          <div className='my-6'>
            <Tabs tabPosition='left'>
              <TabPane tab='Edit Profile' key='1'>
                <ProfileEdit userInfo={data} />
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

UserEdit.getInitialProps = async ({ query }) => {
  const { username } = query;
  const data = await userAPI
    .getUser(username)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    data,
  };
};

export default UserEdit;
