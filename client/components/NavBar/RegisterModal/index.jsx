import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import loginAPI from '../../../api/login';

const Register = ({ open, setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginAPI.register({
      username: values.username,
      password: values.password,
    })
  };

  const onUsernameValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setUsername(e.target.value);
  };

  const onPasswordValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log(form.getFieldsValue('username'));
  }, [username, password]);

  const bg = {
    modal: {
      padding: '0',
      maxWidth: '70vw',
      background: 'rgba(250, 250, 250, 0.95)',
    },
  };
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} styles={bg} center>
        <div className='grid grid-cols-2'>
          <img src='/images/login.jpeg' />
          <div className='p-14'>
            <Form
              form={form}
              name='normal_login'
              className='login-form'
              initialValues={{ remember: true }}
              onFinish={onFinish}>
              <div>
                <Form.Item
                  name='username'
                  rules={[
                    { required: true, message: 'Please input your Username!' },
                  ]}>
                  <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Username'
                    style={{ padding: '0.75rem', borderRadius: '2rem' }}
                    onChange={onUsernameValueChange}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name='password'
                  rules={[
                    { required: true, message: 'Please input your Password!' },
                  ]}>
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                    style={{ padding: '0.75rem', borderRadius: '2rem' }}
                    onChange={onPasswordValueChange}
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className='login-form-forgot' href=''>
                    Forgot password
                  </a>
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
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

export default Register;
