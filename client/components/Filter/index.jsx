import { useEffect } from 'react';
import { Form, DatePicker, Divider, Rate, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import moment from 'moment';

const Filter = ({ options }) => {
  const [form] = Form.useForm();
  // useEffect(() => {
  //   // console.log(form.getFieldsValue('username'));
  // }, [username, password]);

  const onValuesChange = () => {
    console.log(form.getFieldsValue('username'));
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
      </Form>
    </div>
  );
};

export default Filter;
