import {
  CloseCircleOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Image } from 'antd';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { RvContext } from '../../pages/reviews/create/index';

export default function PicturesWall() {
  const fileRef = createRef(null);
  const { images, updateImages } = useContext(RvContext);
  const [previews, updatePreviews] = useState([]);

  useEffect(() => {
    if (images?.length === 0) {
      updatePreviews([]);
    }
  }, [images]);

  const maxImage = 10;

  const handleChange = (e) => {
    let imageList = Array.from(e.target.files);
    if (previews.length + imageList.length <= maxImage) {
      let previewList = imageList.map((image) => URL.createObjectURL(image));
      updateImages((images) => images.concat(imageList));
      updatePreviews((previews) => previews.concat(previewList));
      imageList.map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    } else {
      toastr.error(`No more than ${maxImage} pictures`, 'Error', {
        closeButton: true,
        timeOut: 3000,
      });
    }
  };

  const dropImage = (indexElement) => {
    updateImages(images.filter((image, index) => index !== indexElement));
    updatePreviews(previews.filter((image, index) => index !== indexElement));
  };

  return (
    <div>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        multiple
        onChange={handleChange}
        hidden
      />

      {previews.map((image, index) => (
        <div key={`${index}`} className='inline-block relative m-2'>
          <Image height={120} src={image} preview={false} />
          <Button
            onClick={() => dropImage(index)}
            type='primary'
            size='small'
            shape='circle'
            danger
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(50%, -50%)',
            }}
            icon={<CloseOutlined />}></Button>
        </div>
      ))}
      <div>
        <Button
          onClick={() => fileRef.current.click()}
          size='large'
          type='default'
          shape='round'
          style={{ marginBottom: '20px' }}>
          Image Upload
        </Button>
      </div>
    </div>
  );
}
