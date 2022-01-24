import FRLayout from '../../../layouts/FRLayout';
import { Input, Form, Button, Divider, Rate } from 'antd';
import MyEditor from '../../../components/CustomEditor';
import { useState, useEffect, createContext } from 'react';
import PicturesWall from '../../../components/ImgUploader';
import { fileUpload } from '../../../storeFile';

export const RvContext = createContext();

const CreateReview = () => {
  const [images, updateImages] = useState([]);

  const [serviceRate, setServiceRate] = useState(0);
  const [priceRate, setPriceRate] = useState(0);
  const [foodRate, setFoodRate] = useState(0);
  const [ambienceRate, setAmbienceRate] = useState(0);

  const [text, setText] = useState('');
  const [overAll, setOverAll] = useState(0);
  const onFinish = async (values) => {
    const imagesLink = await Promise.all(
      images?.map(async (image) => await fileUpload(image))
    );

    console.log('Received values of form: ', { ...values, images: imagesLink });
  };
  const onFinishFailed = () => {};
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(form.getFieldsValue('nigga'));
  }, [text]);

  useEffect(() => {
    setOverAll(
      Math.round((serviceRate + priceRate + foodRate + ambienceRate) / 4)
    );
    console.log(overAll);
  }, [serviceRate, priceRate, foodRate, ambienceRate]);

  return (
    <RvContext.Provider value={{ images, updateImages }}>
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
                    <Form.Item name='description'>
                      <MyEditor
                        input={text}
                        setInput={setText}
                        onChange={(value) => form.setFieldsValue(value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='col-span-3'>
                  <div></div>
                  <div>
                    <h3>Rating</h3>
                    <Divider />

                    <Form.Item label='Service' name='service'>
                      <Rate
                        allowHalf
                        onChange={(num) => {
                          form.setFieldsValue(num);
                          setServiceRate(num);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label='Price' name='price'>
                      <Rate
                        allowHalf
                        onChange={(num) => {
                          form.setFieldsValue(num);
                          setPriceRate(num);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label='Food' name='food'>
                      <Rate
                        allowHalf
                        onChange={(num) => {
                          form.setFieldsValue(num);
                          setFoodRate(num);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label='Ambience' name='ambience'>
                      <Rate
                        allowHalf
                        onChange={(num) => {
                          form.setFieldsValue(num);
                          setAmbienceRate(num);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div>
                <Form.Item name='images'>
                  <PicturesWall />
                </Form.Item>
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
    </RvContext.Provider>
  );
};

export default CreateReview;
