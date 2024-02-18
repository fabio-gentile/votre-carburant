'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { Price } from '@/types';

const ICON = icon({
  iconUrl: '/map-fuel-pin.png',
  iconSize: [48, 48],
});

type Props = {
  latitude: number;
  longitude: number;
  address: string;
  prices: Price[];
};

function DynamicMap({ latitude, longitude, address, prices }: Props) {
  console.log('price', prices);
  return (
    <MapContainer
      style={{
        height: '500px',
        width: '100%',
      }}
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={[latitude, longitude]}
        icon={ICON}
      >
        <Popup>
          <p className='text-sm font-bold'>{address}</p>
          <ul className='grid gap-0.5'>
            {prices.map((price) => {
              console.log('price');
              return (
                <li key={price['@id']}>
                  {price['@nom']} : <span className='font-bold'>{price['@valeur']}€/L</span>
                </li>
              );
            })}
          </ul>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default DynamicMap;
