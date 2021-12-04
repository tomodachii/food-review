import React from 'react';
import {
  Form,
  Input,
  Button,
  Row, 
  Col
} from 'antd';


const PasswordChange = () => {

  return (
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

      <Form.Item label="Old Password">
        <Input placeholder='Old Password' />
      </Form.Item>

      <Form.Item label="New Password">
        <Input placeholder='New Password' />
      </Form.Item>

      <Form.Item label="Confirm New Password">
        <Input placeholder='Confirm New Password' />
      </Form.Item>

      <Row>
        <Col push={8} >
          <Button type="primary" size='large'>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PasswordChange;
