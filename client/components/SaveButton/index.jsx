import { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const SaveButton = ({ size }) => {
  const [saved, setSaved] = useState(false);
  let fontSize = ' text-default';
  if (size == 'large') {
    fontSize = ' text-3xl';
  }

  if (size == 'medium') {
    fontSize = ' text-2xl';
  }

  return saved ? (
    <BsBookmarkFill
      className={'text-black cursor-pointer' + fontSize}
      onClick={() => setSaved(false)}
    />
  ) : (
    <BsBookmark
      className={'text-black cursor-pointer' + fontSize}
      onClick={() => setSaved(true)}
    />
  );
};

export default SaveButton;
