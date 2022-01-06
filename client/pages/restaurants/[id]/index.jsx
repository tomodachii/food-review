import FRLayout from '../../../layouts/FRLayout';
import Map from '../../../components/LeafletMap';

const Restaurant = ({ data }) => {
  return (
    <FRLayout>
      <div className='w-3/4 bg-gray-50 mx-auto'>
        <div className='w-1/2 h-[500px]'>
          <Map />
        </div>
      </div>
    </FRLayout>
  );
};
export default Restaurant;
