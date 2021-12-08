import FRLayout from '../../../layouts/FRLayout';
import Slider from '../../../components/Review/Slider';
import data from '../../../testreview';
import { AiTwotoneStar } from 'react-icons/ai';
import LikeButton from '../../../components/LikeButton';
import SaveButton from '../../../components/SaveButton';

const Review = () => {
  return (
    <FRLayout>
      <div className='w-full bg-gray-50 mx-auto'>
        <div className='my-5 mx-auto w-1/2 relative p-5'>
          <h4 className='text-gray-400 ml-1'>category</h4>
          <h1>Title</h1>
        </div>
        <Slider data={data} />
        <div className='mx-auto w-1/2 p-5 relative'>
          <div className='flex flex-col items-center fixed left-[17%] top-1/4 z-10'>
            <div>
              <LikeButton size='large' />
            </div>
            <div>
              <SaveButton size='large' />
            </div>
            <div></div>
          </div>
          <div className='flex items-center mb-5 gap-5'>
            <AiTwotoneStar className='text-2xl text-yellow-400' />
            <h3 className='m-0'>4.5 / 5</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            ipsa quos laudantium consectetur, velit odio natus nihil voluptas
            necessitatibus suscipit repellendus eaque quae sit! Quis soluta
            blanditiis consequuntur distinctio adipisci.
          </p>
        </div>
      </div>
    </FRLayout>
  );
};

export default Review;
