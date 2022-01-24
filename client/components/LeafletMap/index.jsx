// import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

const Map = () => {
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [click, setClick] = useState(false);
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const { useMapEvents, MapContainer, TileLayer, Marker, Popup } =
    mapRef.current || {};
  const LRef = useRef();
  const L = LRef.current || {};
  useEffect(() => {
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
      iconUrl: '../images/marker.png',
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
          center={[21.027763, 105.83416]}
          zoom={13}
          scrollWheelZoom={true}>
          <Markers />
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
