import { useEffect, useState } from 'react';
import { Form, DatePicker, Divider, Rate, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import moment from 'moment';
import restaurantsAPI from '../../api/restaurants';
import reviewsAPI from '../../api/reviews';

const Filter = ({ options, setReviews, flag }) => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    restaurantsAPI
      .getDistricts()
      .then((res) => {
        console.log('districts: ', res.data);
        setDistricts(res.data.districts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onValuesChange = () => {
    console.log(form.getFieldsValue('sort'));
    console.log(form.getFieldsValue('date'));
    console.log(form.getFieldsValue('district'));
  };

  const convertDate = (dateTime) => {
    let index = dateTime.indexOf('T');
    let date = dateTime.slice(0, 10);
    let time = dateTime.slice(index + 1, index + 6);
    return { index, date, time };
  };

  const handleDateChange = (value) => {
    if (value) {
      if (value[0]) {
        if (value[1]) {
          reviewsAPI
            .getReviewByDate(
              convertDate(moment(value[0]).format()).date,
              convertDate(moment(value[1]).format()).date
            )
            .then((res) => {
              console.log(res.data.reviews);
              setReviews(res.data.reviews);
            });
        }
      }
    }
  };

  const handleRateChange = (value) => {
    if (flag === 'reviews') {
      // setReviews(prevState => prevState.filter())
    }
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
            <p className='m-0' style={{ textAlign: 'center' }}>
              Sort
            </p>
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
              <Rate onChange={handleRateChange} />
            </Form.Item>
          </div>
        )}

        <div className='p-6 pb-1 bg-white transition duration-300 ease-in-out rounded-xl shadow hover:shadow-xl mb-5'>
          <p className='m-0' style={{ textAlign: 'center' }}>
            District
          </p>
          <Divider style={{ margin: '0.5rem' }} />
          <Form.Item name='district'>
            <Select defaultValue='All' bordered={false}>
              {districts?.map((district) => (
                <Option value={district.district_id}>
                  {district.district_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
