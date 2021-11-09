import Head from 'next/head';
import ParallaxHeader from '../components/Home/ParallaxHeader';
import FRLayout from '../layouts/FRLayout';

export default function Home() {
  return (
    <FRLayout>
      <div className='w-full m-0'>
        <ParallaxHeader />
      </div>
    </FRLayout>
  );
}
