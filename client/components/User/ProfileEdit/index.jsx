import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Divider, Select } from 'antd';
import { fileUpload } from '../../../storeFile';
import userAPI from '../../../api/users';

const ProfileEdit = ({ userInfo }) => {
  const [avatar, updateAvatar] = useState({});
  const [preview, updatePreview] = useState('');

  useEffect(() => {
    console.log(userInfo);

    return () => {
      URL.revokeObjectURL(preview);
    };
  });

  const previewAvatar = (e) => {
    console.log('image: ', e.target.files[0]);
    let image = e.target.files[0];
    updateAvatar(image);

    let previewImage = URL.createObjectURL(image);
    updatePreview(previewImage);
  };

  const finish = async (value) => {
    // if (value.displayName) {
    const avatarString = await fileUpload(avatar);
    userAPI.editProfile({ ...userInfo, ...value, avatar: avatarString });
    // }
  };

  return (
    <>
      {/* Đổi avt */}

      <div className='grid grid-flow-col gap-5' style={{ marginBottom: -50 }}>
        <div className='row-span-3 flex flex-row-reverse '>
          <img
            className='rounded-full h-20 w-20'
            src={userInfo.avatar || userInfo.img}
          />
        </div>
        <div className='col-span-2 ml-4'>
          <h3>{userInfo.user}</h3>
          <label className='flex flex-col cursor-pointer w-32 h-12'>
            <h3 className='text-blue-500 text-sm'>Change Avatar</h3>
            <input
              type='file'
              accept='image/*'
              className='opacity-0'
              onChange={previewAvatar}
            />
          </label>
        </div>
      </div>

      {/* Đổi thông tin tài khoản */}
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        size='large'
        onFinish={finish}>
        <Divider plain>
          <span className='text-gray-400 m-0 font-medium'>Account info</span>
        </Divider>

        <Form.Item name='displayName' label='Name'>
          <Input
            placeholder='Display name'
            defaultValue={userInfo.displayName || userInfo.username}
          />
        </Form.Item>
        <Divider plain>
          <span className='text-gray-400 font-medium'>
            Personal Information
          </span>
        </Divider>

        <Form.Item name='email' label='Email'>
          <Input placeholder='Email' defaultValue={userInfo.email} />
        </Form.Item>

        <Form.Item name='phone_number' label='Phone number'>
          <Input
            rules={[{ required: true, message: 'Please input your username!' }]}
            placeholder='Phone number'
            defaultValue={userInfo.phone_number}
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col push={8}>
              <Button type='primary' htmlType='submit' size='large'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileEdit;
