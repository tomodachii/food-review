import React, { useContext, useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  GoogleSquareFilled,
  FacebookFilled,
} from '@ant-design/icons';
import loginAPI from '../../../api/login';
import userContext from '../../../UserContext';
import userAPI from '../../../api/users';

const LoginModal = ({ open, setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();
  const {
    user,
    setUser,
    setUserLikedReviews,
    setUserSavedReviews,
    setUserWrittenReviews,
  } = useContext(userContext);
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    let temp = await loginAPI
      .login({
        username: values.username,
        password: values.password,
      })
      .then(async (res) => {
        console.log(res.data.user);
        await setUser(res.data.user);
        await setOpen(false);
        await openNotification('success', 'Hello ' + res.data.user.username);
        return res.data.user;
      })
      .catch((err) => {
        console.log('login error');
        console.error(err);
      });
    console.log(temp);
    if (temp) {
      await userAPI
        .getUserLikedReviewsArray(temp.user_id)
        .then((res) => {
          setUserLikedReviews(res.data);
        })
        .catch((err) => {
          console.log('error');
          console.error(err);
        });
      await userAPI
        .getUserSavedReviewsArray(temp.user_id)
        .then((res) => {
          setUserSavedReviews(res.data);
        })
        .catch((err) => {
          console.log('error');
          console.error(err);
        });
      await userAPI
        .getUserWrittenReviews(temp.user_id)
        .then((res) => setUserWrittenReviews(res.data))
        .catch((err) => {
          console.log('error');
          console.error(err);
        });
    }
  };

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const onUsernameValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setUsername(e.target.value);
  };

  const onPasswordValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setPassword(e.target.value);
  };

  const logInSocial = (social) => {
    window.open(`http://localhost:5000/users/signin/${social}`, '_self');
  };

  useEffect(() => {
    // console.log(form.getFieldsValue('username'));
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
              <Form.Item>
                <Button
                  style={{ marginRight: '10px' }}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  danger>
                  Log in
                </Button>
                Or <a href=''>register now!</a>
              </Form.Item>
            </Form>
            <Button
              onClick={() => logInSocial('google')}
              style={{
                textAlign: 'left',
                color: 'white',
                marginBottom: '10px',
                width: '50%',
                display: 'block',
              }}
              danger
              size='large'
              icon={<GoogleSquareFilled />}>
              Google
            </Button>
            <Button
              onClick={() => logInSocial('facebook')}
              style={{
                textAlign: 'left',
                width: '50%',
                color: 'white',
                display: 'block',
                background: '#1294f4',
              }}
              size='large'
              icon={<FacebookFilled />}>
              Facebook
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
