import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useState } from 'react';
import { DraggableMarker } from './DraggableMarker';
import { Markers } from './Markers';

const L = require('leaflet');
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: calc(100vh - 66px);
`;

interface loadLocationProps{
  userLocation: {lat: number, lng: number};
  setUserLocation: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
}

function LoadToUserLocation(props: loadLocationProps) {
  const { userLocation, setUserLocation } = props;
  const map = useMap();
  if (userLocation.lat === 0 && userLocation.lng === 0){
    map.locate().on('locationfound', function (e: any) {
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });

  }
  return null;
}

interface Props{
  setMarkerPos: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
};

export function MapComponent(props: Props) {
  const { setMarkerPos, setShowReviewForm, setSelectedMarker } = props;
  const [ userLocation, setUserLocation ] = useState({lat: 0, lng: 0});

  return (
    <StyledMapContainer center={[-27.469, 153.024]} zoom={13} scrollWheelZoom={false}>
      <LoadToUserLocation userLocation={userLocation} setUserLocation={setUserLocation}/>
      {
        userLocation.lat !== 0 && userLocation.lng !== 0 &&
        <DraggableMarker userLocation={userLocation} setMarkerPos={setMarkerPos} />
      }
      {/* Loop through waypoints and add marker for each */}
      <Markers pos={[-27.469, 153.024]} setShowReviewForm={setShowReviewForm} setSelectedMarker={setSelectedMarker} />
      <Markers pos={[-27.469, 153.124]} setShowReviewForm={setShowReviewForm} setSelectedMarker={setSelectedMarker} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </StyledMapContainer>
  );
}
