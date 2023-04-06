import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { DraggableMarker } from './DraggableMarker';
import { getDocs, collection, query, where, setDoc, doc } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { Markers } from './Markers';
import { FetchMarkersDTO } from '../../Types';
import { MapContext } from '../../MapContext';

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
    map.on('locationerror', () => alert('user denied access to location'));

  }
  return null;
}

interface Props{
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const initData: FetchMarkersDTO[] = [];

export function MapComponent(props: Props) {
  const { setShowReviewForm } = props;
  const { mapName } = useContext(MapContext);
  const [ userLocation, setUserLocation ] = useState({lat: 0, lng: 0});
  const [ data, setData ] = useState(initData);

  async function fetchMarkers() {
    const mapRef = collection(firestore, 'maps3');
    const mapQuery = query(mapRef, where('mapName', '==', mapName));
    const mapSnapshot = await getDocs(mapQuery);

    if (!mapSnapshot.empty) {
      const mapDoc = mapSnapshot.docs[0];
      const markersRef = collection(firestore, 'maps3', mapDoc.id ,'markers');
      const markersSnapshot = await getDocs(markersRef);

      if (!markersSnapshot.empty) {
        const markers = markersSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: {
            name: doc.data().name,
            lat: doc.data().latlng.lat,
            lng: doc.data().latlng.lng,
            ramps: doc.data().ramps,
            dropIns: doc.data().dropIns,
            pumpTrack: doc.data().pumpTrack,
            bowl: doc.data().bowl,
          }
        }));
        console.log(`Markers on the ${mapName} map:`, markers);
        setData(markers);                
      } else {
        console.log(`No markers found on the ${mapName} map.`, mapSnapshot, mapQuery);
      }
    }  else {
      console.log(`${mapName} map does not exist`);
      try {
        const newMapRef = doc(mapRef); // create a new document reference in the "maps" collection
        const newMapData = {
          mapName: mapName
        };
        await setDoc(newMapRef, newMapData);
        console.log(`New ${mapName} map created.`);
      } catch (error) {
        console.error(`Error creating new ${mapName} map:`, error);
      }
    }
  }

  useEffect(()=>{
    fetchMarkers();
  }, [])

  return (
    <StyledMapContainer center={[-27.469, 153.024]} zoom={13} scrollWheelZoom={false}>
      <LoadToUserLocation userLocation={userLocation} setUserLocation={setUserLocation}/>
      {
        userLocation.lat !== 0 && userLocation.lng !== 0 &&
        <DraggableMarker userLocation={userLocation} />
      }
      {
        data.length > 0 ? 
          data.map(marker => (
              <Markers
                id={marker.id}
                data={marker.data}
                setShowReviewForm={setShowReviewForm}
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
