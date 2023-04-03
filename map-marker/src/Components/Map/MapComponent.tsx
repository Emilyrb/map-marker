import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DraggableMarker } from './DraggableMarker';
import { getDocs, collection } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { Markers } from './Markers';
import { MarkersDTO } from '../../Types';

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

const initData: MarkersDTO[] = [];

export function MapComponent(props: Props) {
  const { setMarkerPos, setShowReviewForm, setSelectedMarker } = props;
  const [ userLocation, setUserLocation ] = useState({lat: 0, lng: 0});
  const [ data, setData ] = useState(initData);

  const fetchMarkers = async () => {
    await getDocs(collection(firestore, 'Markers'))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => {
                const docData = doc.data();
                return {
                  data: {
                    'form.Latlng': {
                      lat: docData.data['form.Latlng'].lat,
                      lng: docData.data['form.Latlng'].lng,
                    },
                    'form.Address': docData.data['form.Address'],
                    'form.Name': docData.data['form.Name'],
                    'form.Image': docData.data['form.Image'],
                    reviewIds: docData.data.reviewIds,
                    mapType: docData.data.mapType,
                  },
                  id: doc.id,
                };
              });
          setData(newData);                
      })
  }

  useEffect(()=>{
    fetchMarkers();
  }, [])

  return (
    <StyledMapContainer center={[-27.469, 153.024]} zoom={13} scrollWheelZoom={false}>
      <LoadToUserLocation userLocation={userLocation} setUserLocation={setUserLocation}/>
      {
        userLocation.lat !== 0 && userLocation.lng !== 0 &&
        <DraggableMarker userLocation={userLocation} setMarkerPos={setMarkerPos} />
      }
      {
        data.length > 0 ? 
          data.map(marker => (
              <Markers
                pos={[marker.data['form.Latlng'].lat, marker.data['form.Latlng'].lng]}
                setShowReviewForm={setShowReviewForm}
                setSelectedMarker={setSelectedMarker}
              />
          ))
          : null /* loading screen */
      }
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </StyledMapContainer>
  );
}
