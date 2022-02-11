import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import userAPI from '../../../api/users';

const PasswordChange = () => {
  const finish = (value) => {
    userAPI.editPassword(value);
  };
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout='horizontal'
      onFinish={finish}
      size='large'>
      <Form.Item
        label='Old Password'
        name='oldPassword'
        rules={[{ required: true, message: 'Please input old password' }]}>
        <Input.Password placeholder='Old Password' />
      </Form.Item>

      <Form.Item
        label='New Password'
        name='newPassword'
        rules={[{ required: true, message: 'Please input new password' }]}>
        <Input.Password placeholder='New Password' />
      </Form.Item>

      <Form.Item
        label='Confirm New Password'
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
        name='rePassword'>
        <Input.Password placeholder='Confirm New Password' />
      </Form.Item>

      <Form.Item>
        <Row>
          <Col push={8}>
            <Button type='primary' size='large' htmlType='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default PasswordChange;
