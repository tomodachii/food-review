import Item from './Item';
import { motion, AnimateSharedLayout } from 'framer-motion';

const MiniReview = ({ reviews, col }) => {
  const column =
    col === 3 ? ' review__section-col-3' : ' review__section-col-4';
  return (
    <AnimateSharedLayout>
      <motion.div className={'w-full p-12' + column}>
        {reviews.map((review, index) => (
          <Item key={new Date().getTime().toString + index} review={review} />
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default MiniReview;
