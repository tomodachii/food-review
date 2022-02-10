import { useEffect, useState } from 'react';
import { Form, DatePicker, Divider, Rate, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import moment from 'moment';
import restaurantsAPI from '../../api/restaurants'

const Filter = ({ options }) => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    restaurantsAPI.getDistricts()
    .then(res => {
      console.log("districts: ", res.data);
      setDistricts(res.data.districts)
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const onValuesChange = () => {
    console.log(form.getFieldsValue('sort'));
    console.log(form.getFieldsValue('date'));
    console.log(form.getFieldsValue('district'));
  };
  const handleDateChange = (value) => {
    console.log(moment(value[0]).format());
    console.log(moment(value[0]).toDate().getDate());
    console.log(moment('2021-12-06T17:57:20.844Z').toDate());
  };
  return (
    <div className='w-full'>
      <Form
        colon={false}
        form={form}
        name='normal_filter'
        className='filter-form'
        onValuesChange={onValuesChange}>
        {(!options || options.includes('sort')) && (
          <div className='p-6 pb-1 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
            <p className='m-0' style={{textAlign: 'center'}}>Sort</p>
            <Divider style={{ margin: '0.5rem' }} />
            <Form.Item name='sort'>
              <Select defaultValue='Date' bordered={false}>
                <Option value='date'>Date</Option>
                <Option value='rating'>Rating</Option>
              </Select>
            </Form.Item>
          </div>
        )}
        {(!options || options.includes('date')) && (
          <div className='flex flex-col items-center p-5 pb-1 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
            <p className='m-0'>Time</p>
            <Divider style={{ margin: '0.5rem' }} />
            <Form.Item name='date'>
              <RangePicker
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                onChange={handleDateChange}
              />
            </Form.Item>
          </div>
        )}
        {(!options || options.includes('rating')) && (
          <div className='flex flex-col items-center p-5 pb-1 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
            <p className='m-0'>Rating</p>
            <Divider style={{ margin: '0.5rem' }} />
            <Form.Item name='rating'>
              <Rate />
            </Form.Item>
          </div>
        )}

        <div className='p-6 pb-1 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
          <p className='m-0' style={{textAlign: 'center'}}>District</p>
          <Divider style={{ margin: '0.5rem' }} />
          <Form.Item name='district'>
            <Select defaultValue='All' bordered={false}>
              {districts?.map(district => (
                <Option value={district.district_id}>{district.district_name}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
