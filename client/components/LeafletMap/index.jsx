// import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

const Map = ({ lat, lng }) => {
  const [selectedPosition, setSelectedPosition] = useState([
    20.993776, 105.811417,
  ]);
  const [click, setClick] = useState(false);
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const { useMapEvents, MapContainer, TileLayer, Marker, Popup } =
    mapRef.current || {};
  const LRef = useRef();
  const L = LRef.current || {};
  useEffect(() => {
    if (lat) {
      if (lng) {
        setSelectedPosition([lat, lng]);
      }
    }
    mapRef.current = {
      useMapEvents: require('react-leaflet').useMapEvents,
      MapContainer: require('react-leaflet').MapContainer,
      TileLayer: require('react-leaflet').TileLayer,
      Marker: require('react-leaflet').Marker,
      Popup: require('react-leaflet').Popup,
    };
    LRef.current = require('leaflet');
    setMapLoaded(true);
  }, []);

  const getIcon = (size) => {
    return L.icon({
      iconUrl: '../images/marker1.png',
      iconSize: size,
    });
  };

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        console.log(e);
      },
    });

    return selectedPosition ? (
      <Marker
        key={selectedPosition[0]}
        position={selectedPosition}
        interactive={false}
        icon={getIcon(50)}
      />
    ) : null;
  };
  return (
    <div className='w-full h-full'>
      {mapLoaded ? (
        <MapContainer
          center={selectedPosition}
          zoom={15}
          scrollWheelZoom={true}>
          {/* <Markers /> */}
          <Marker
            key={selectedPosition[0]}
            position={selectedPosition}
            interactive={false}
            icon={getIcon(50)}
          />
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">POWEROFFRIENDSHIP</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* <Marker position={[51.505, -0.09]} icon={getIcon(50)}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
      ) : (
        <>Map Loading...</>
      )}
    </div>
  );
};

export default Map;
