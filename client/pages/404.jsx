import FRLayout from '../layouts/FRLayout';
import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';

const ErrorNotFound = () => {
  const router = useRouter();

  return (
    <FRLayout>
      <div className='w-full bg-white'>
        <div className='w-3/4 mx-auto py-5 flex flex-col items-center'>
          <h1 className='text-center text-10xl font-bold text-[#dd2f46]'>
            404
          </h1>
          <h2 className='text-center'>
            Whooops!! Looks like this page doesn't exist
          </h2>
          <p className='mt-7 mb-10'>You could go to our homepage</p>
          <div className='mb-10'>
            <Button
              type='primary'
              size='large'
              onClick={() => {
                router.push('/');
              }}>
              Homepage
            </Button>
          </div>
        </div>
      </div>
    </FRLayout>
  );
};

export default ErrorNotFound;
