import FRLayout from '../../../layouts/FRLayout';
import { Input, Form, Button, Divider, Rate, Select, notification } from 'antd';
import MyEditor from '../../../components/CustomEditor';
import { useState, useEffect, createContext } from 'react';
import PicturesWall from '../../../components/ImgUploader';
import { fileUpload } from '../../../storeFile';
import restaurantsAPI from '../../../api/restaurants';
import homeAPI from '../../../api/home';
import userAPI from '../../../api/users';
import CreateRestaurantModal from '../../../components/Restaurant/CreateRestaurantModal';
import UserContext from '../../../UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const { Option } = Select;

export const RvContext = createContext();

const CreateReview = () => {
  const router = useRouter();
  const [images, updateImages] = useState([]);

  const [restaurants, setRestaurants] = useState();
  const [categories, setCategories] = useState();

  const [serviceRate, setServiceRate] = useState(0);
  const [priceRate, setPriceRate] = useState(0);
  const [foodRate, setFoodRate] = useState(0);
  const [ambienceRate, setAmbienceRate] = useState(0);

  const [text, setText] = useState('');
  const [overAll, setOverAll] = useState(0);
  const { user } = useContext(UserContext);
  const onFinish = async (values) => {
    const imagesLink = await Promise.all(
      images?.map(async (image) => await fileUpload(image))
    );

    if (!values.food) values.food = 0;
    if (!values.service) values.service = 0;
    if (!values.ambience) values.ambience = 0;
    if (!values.price) values.price = 0;

    console.log('Received values of form: ', {
      ...values,
      images: imagesLink,
      overall: overAll,
    });
    userAPI
      .createReview({
        ...values,
        images: imagesLink,
        overall: overAll,
        user_id: user.user_id,
      })
      .then((res) => {
        console.log('create review', res.data);
        openNotification('success', 'Sucessfully created new review');
        router.push(`/user/${user.username}`);
      })
      .catch((err) => {
        openNotification('error', 'Error');
      });
  };
  const onFinishFailed = () => {};
  const [form] = Form.useForm();

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  useEffect(() => {
    console.log(form.getFieldsValue('nigga'));
  }, [text]);

  useEffect(() => {
    if (!user) {
      openNotification('error', 'You have to log in first');
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    setOverAll(
      Math.round((serviceRate + priceRate + foodRate + ambienceRate) / 4)
    );
    console.log(overAll);
  }, [serviceRate, priceRate, foodRate, ambienceRate]);

  useEffect(() => {
    restaurantsAPI.getRestaurants().then((res) => {
      setRestaurants(res.data);
    });
    homeAPI.getCategories().then((res) => {
      console.log('hello ', res.data.categories);
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <RvContext.Provider value={{ images, updateImages }}>
      <FRLayout>
        <div className='w-full mx-auto '>
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
                <div className='col-span-6'>
                  <div>
                    <Form.Item
                      name='title'
                      rules={[
                        {
                          required: true,
                          message: 'Please input title!',
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
                <div className='col-span-4'>
                  <div>
                    <h4>Restaurant</h4>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Please choose restaurant!',
                        },
                      ]}
                      name='restaurant_id'>
                      <Select
                        size='large'
                        showSearch
                        style={{ width: '100%' }}
                        placeholder='Search to Select'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                        }>
                        {restaurants?.map((restaurant) => (
                          <Option
                            key={restaurant.restaurant_id}
                            value={restaurant.restaurant_id}>
                            {restaurant.restaurant_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className='flex justify-between'>
                    <div></div>
                    <CreateRestaurantModal />
                  </div>

                  <div>
                    <h4>Category</h4>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Please choose category!',
                        },
                      ]}
                      name='category_id'>
                      <Select
                        size='large'
                        showSearch
                        style={{ width: '100%' }}
                        placeholder='Search to Select'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                        }>
                        {categories?.map((item) => (
                          <Option
                            key={item.category_id}
                            value={item.category_id}>
                            {item.category_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div>
                    <h4>Rating</h4>
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
