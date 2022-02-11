import { Comment, Avatar, Form, Button, List, Input, notification } from 'antd';
import moment from 'moment';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../UserContext';
import userAPI from '../../api/users';
import reviewsAPI from '../../api/reviews';
const { TextArea } = Input;

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout='horizontal'
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        size='large'
        type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentSection = ({ review_id }) => {
  // state = {
  //   comments: [],
  //   submitting: false,
  //   value: '',
  // };
  const { user, setLoginModalOpen } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    reviewsAPI.getComments(review_id).then((res) => {
      if (res.data) {
        // setComments(res.data)
        console.log(res.data);
        setComments(
          res.data.map((item) => ({
            author: item.users.displayName
              ? item.users.displayName
              : item.users.username,
            avatar: item.users.avatar,
            content: <p>{item.comment_content}</p>,
            datetime: item.comment_date,
          }))
        );
      }
    });
  }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 3,
    });
  };

  const handleSubmit = () => {
    if (user) {
      if (!value) {
        return;
      }
      // this.setState({
      //   submitting: true,
      // });
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        setComments((prevState) => [
          ...prevState,
          {
            author: user?.displayName ? user?.displayName : user?.username,
            avatar: user?.avatar,
            content: <p>{value}</p>,
            datetime: moment().fromNow(),
          },
        ]);
        setValue('');
      }, 1000);

      userAPI.comment({ review_id, comment_content: value });
    } else {
      openNotification('error', 'You have to log in first');
      setLoginModalOpen(true);
    }
  };

  const handleChange = (e) => {
    // this.setState({
    //   value: e.target.value,
    // });
    setValue(e.target.value);
  };

  // render() {
  //   const { comments, submitting, value } = this.state;

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src={user?.avatar} alt='Han Solo' />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default CommentSection;
