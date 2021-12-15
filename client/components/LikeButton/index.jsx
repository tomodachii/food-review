import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = ({ size }) => {
  const [liked, setLiked] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-2xl';
  }

  return liked ? (
    <FaHeart
      className={'text-red-700 cursor-pointer' + fontSize}
      onClick={() => setLiked(false)}
    />
  ) : (
    <FaRegHeart
      className={'text-black cursor-pointer' + fontSize}
      onClick={() => setLiked(true)}
    />
  );
};

export default LikeButton;
