import React, { useContext, useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Form, Input, Button, notification, Select } from 'antd';
import Map from '../../LeafletMap/index';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { BiRestaurant } from 'react-icons/bi';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import homeAPI from '../../../api/home';
import districtsData from '../../../districtLocation';

const { Option } = Select;

const CreateRestaurantModal = () => {
  const [open, setOpen] = useState(false);
  const [districtList, setDistrictList] = useState(districtsData);
  const [restaurantName, setRestarantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [form] = Form.useForm();

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
  };

  // useEffect(() => {
  //   homeAPI.getDistricts().then((res) => {
  //     setDistrictList(res.data.districts);
  //   });
  // }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const onRestaurantNameValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setRestarantName(e.target.value);
  };

  const onPhoneNumberValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const onAddressValueChange = (e) => {
    form.setFieldsValue(e.target.value);
    setAddress(e.target.value);
  };

  useEffect(() => {
    console.log(form.getFieldsValue('name'));
  }, [restaurantName]);

  const bg = {
    modal: {
      padding: '0',
      maxWidth: '70vw',
      background: 'rgba(250, 250, 250, 0.95)',
    },
  };
  return (
    <div>
      <button
        className='text-[#272343] transition duration-300 ease-in-out hover:text-[#dd2f46] hover:-translate-1 hover:scale-110 pb-5 pl-2 block text-right'
        onClick={() => setOpen(true)}>
        Add restaurant
      </button>
      <Modal open={open} onClose={() => setOpen(false)} styles={bg} center>
        <div className='grid grid-cols-2'>
          {/* <img src='/images/login.jpeg' /> */}
          <Map />
          <div className='p-14'>
            <Form
              form={form}
              name='add-restaurant'
              className='add-restaurant-form'
              onFinish={onFinish}>
              <div>
                <Form.Item
                  name='restaurant_name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your restaurant name!',
                    },
                  ]}>
                  <Input
                    prefix={<BiRestaurant />}
                    placeholder='Restaurant Name'
                    style={{ padding: '0.75rem', borderRadius: '2rem' }}
                    onChange={onRestaurantNameValueChange}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name='phoneNumber'>
                  <Input
                    prefix={<AiFillPhone />}
                    placeholder='Phone Number'
                    style={{ padding: '0.75rem', borderRadius: '2rem' }}
                    onChange={onPhoneNumberValueChange}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name='address'>
                  <Input
                    prefix={<MdLocationOn />}
                    placeholder='Address'
                    style={{ padding: '0.75rem', borderRadius: '2rem' }}
                    onChange={onAddressValueChange}
                  />
                </Form.Item>
              </div>
              <div>
                <h4 className='pl-2'>District</h4>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please choose category!',
                    },
                  ]}
                  name='district_id'>
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
                    {districtList?.map((item) => (
                      <Option key={item.district_id} value={item.district_id}>
                        {item.district_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div>
                <h4 className='pl-2'>Time</h4>
                <div className='flex justify-between items-center'>
                  <Form.Item
                    name='time-start'
                    style={{ flexGrow: 1, marginBottom: 0 }}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='Start'
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
                      {[...Array(24).keys()].map((item, index) => (
                        <Option key={`${index}h`} value={`${index} h`}>
                          {`${index} h`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <h5 className='inline p-0 px-2 m-0' style={{ flexGrow: 0 }}>
                    To
                  </h5>

                  <Form.Item
                    name='time-end'
                    style={{ flexGrow: 1, marginBottom: 0 }}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='End'
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
                      {[...Array(24).keys()].map((item, index) => (
                        <Option key={`${index}h`} value={`${index} h`}>
                          {`${index} h`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div>
                <h4 className='pl-2'>Day</h4>
                <div className='flex justify-between items-center'>
                  <Form.Item
                    name='day-start'
                    style={{ flexGrow: 1, marginBottom: 0 }}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='Start'
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
                      {days.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <h5 className='inline p-0 px-2 m-0'>To</h5>

                  <Form.Item
                    name='day-end'
                    style={{ flexGrow: 1, marginBottom: 0 }}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='End'
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
                      {days.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please choose district!',
                    },
                  ]}
                  name='district_id'></Form.Item>
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
      </Modal>
    </div>
  );
};

export default CreateRestaurantModal;
