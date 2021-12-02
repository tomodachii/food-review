import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const LikeButton = ({ size }) => {
  const [liked, setLiked] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  return liked ? (
    <AiFillHeart
      className={'text-red-700 cursor-pointer' + fontSize}
      onClick={() => setLiked(false)}
    />
  ) : (
    <AiOutlineHeart
      className={'text-black cursor-pointer' + fontSize}
      onClick={() => setLiked(true)}
    />
  );
};

export default LikeButton;
