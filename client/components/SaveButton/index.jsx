import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const SaveButton = ({ size }) => {
  const [saved, setSaved] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-xl';
  }

  return saved ? (
    <FaBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={() => setSaved(false)}
    />
  ) : (
    <FaRegBookmark
      className={'text-black cursor-pointer font-bold' + fontSize}
      onClick={() => setSaved(true)}
    />
  );
};

export default SaveButton;
