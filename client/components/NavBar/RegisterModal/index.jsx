import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const RegisterModal = ({ open, setOpen }) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const bg = {
    modal: {
      padding: '0',
      maxWidth: '70vw',
      background: 'rgba(250, 250, 250, 0.9)',
    },
  };
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} styles={bg} center>
        <div className='grid grid-cols-2'>
          <img src='/images/register.jpeg' />
          <div className='p-14'>
            <Form
              name='normal_register'
              className='register-form'
              initialValues={{ remember: true }}
              onFinish={onFinish}>
              <Form.Item
                name='username'
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}>
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Username'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}>
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className='register-form-forgot' href=''>
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='register-form-button'
                  danger>
                  Log in
                </Button>
                Or <a href=''>register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterModal;
