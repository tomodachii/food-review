import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Select
} from 'antd';


const ProfileEdit = ({ userInfo }) => {

  return (
    <>
      {/* Đổi avt */}

      <div className="grid grid-flow-col gap-5" style={{marginBottom: -50}}>
        <div className="row-span-3 flex flex-row-reverse ">
          <img
            className='rounded-full h-20 w-20'
            src={userInfo.img}
          />
        </div>
        <div className="col-span-2 ml-4">
          <h3>{userInfo.user}</h3>
          <label className="flex flex-col cursor-pointer w-32 h-12">
            <h3 className='text-blue-500 text-sm'>Change Avatar</h3>
            <input type="file" accept="image/*" className="opacity-0" />
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
        layout="horizontal"
        size='large'
      >
        <Divider plain ><span className='text-gray-400 text-sm'>Thông tin tài khoản</span></Divider>

        <Form.Item label="Tên">
          <Input placeholder='Tên' />
          <p className='mt-4 text-gray-400 text-xs' >Help people discover your account by using the name you're known by: either your full name, nickname, or business name. You can only change your name twice within 14 days.</p>
        </Form.Item>

        <Form.Item label="Username">
          <Input placeholder='Username' />
          <p className='mt-4 text-gray-400 text-xs' >In most cases, you'll be able to change your username back to adoseoflithium for another 14 days.</p>
        </Form.Item>

        <Form.Item label="Website">
          <Input placeholder='Website' />
        </Form.Item>

        <Divider plain><span className='text-gray-400 text-sm'>Thông tin cá nhân</span></Divider>

        <Form.Item label="Email">
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item label="Giới tính">
          <Select>
            <Select.Option value="demo">Nam</Select.Option>
            <Select.Option value="demo">Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Row >
          <Col push={8} >
            <Button type="primary" size='large'>Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProfileEdit;
