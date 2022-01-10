import FRLayout from '../../../layouts/FRLayout';
import { Input, Form, Button, Divider, Rate } from 'antd';
import MyEditor from '../../../components/CustomEditor';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const CreateReview = () => {
  const [text, setText] = useState('');
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onFinishFailed = () => {};
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(form.getFieldsValue('nigga'));
  }, [text]);

  return (
    <FRLayout>
      <div className='w-3/4 mx-auto '>
        <h2 className='text-center my-8 '>Write Review</h2>
        <div className='w-full p-10 bg-white rounded-xl shadow'>
          <Form
            form={form}
            name='basic'
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <div className='grid grid-cols-10 gap-10'>
              <div className='col-span-7'>
                <div>
                  <Form.Item
                    name='title'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}>
                    <Input
                      size='large'
                      style={{ fontSize: '1.5rem' }}
                      bordered={false}
                      placeholder='Title...'
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item>
                    <MyEditor input={text} setInput={setText} />
                  </Form.Item>
                </div>
              </div>
              <div className='col-span-3'>
                <div></div>
                <div>
                  <h3>Rating</h3>
                  <Divider />
                  <Form.Item label='Overall' name='overall'>
                    <Rate
                      disabled
                      style={{ color: 'red' }}
                      character={({ index }) => customIcons[index + 1]}
                    />
                  </Form.Item>
                  <Form.Item label='Service' name='service'>
                    <Rate
                      onChange={(num) => {
                        form.setFieldsValue(num);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label='Price' name='price'>
                    <Rate
                      onChange={(num) => {
                        form.setFieldsValue(num);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label='Food' name='food'>
                    <Rate
                      onChange={(num) => {
                        form.setFieldsValue(num);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label='Ambience' name='ambience'>
                    <Rate
                      onChange={(num) => {
                        form.setFieldsValue(num);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className='flex gap-10'>
              <div>
                <Form.Item>
                  <Button type='primary' htmlType='submit' size='large'>
                    Submit
                  </Button>
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Button type='default' htmlType='submit' size='large'>
                    Cancel
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </FRLayout>
  );
};

export default CreateReview;
