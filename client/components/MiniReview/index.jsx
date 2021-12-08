import Item from './Item';
import { motion, AnimateSharedLayout } from 'framer-motion';

const MiniReview = ({ reviews }) => {
  return (
    <AnimateSharedLayout>
      <motion.div className='w-full review--mini__section p-12'>
        {reviews.map((review, index) => (
          <Item key={new Date().getTime().toString + index} review={review} />
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default MiniReview;
