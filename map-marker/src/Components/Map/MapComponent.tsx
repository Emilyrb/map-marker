import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getDocs } from '@firebase/firestore';
// import { getDocs, collection, query, where, setDoc, doc } from '@firebase/firestore';
// import { firestore } from '../../firebase_setup/firebase';
import { FetchMarkersDTO } from '../../Types';
import { MapContext } from '../../MapContext';
import { fetchMap } from '../../api';
import { RenderMapMarkers } from './RenderMapMarkers';

const L = require('leaflet');
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

interface Props{
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const initData: FetchMarkersDTO[] = [];

function setGenericData(doc: any){
  return ({
    id: doc.id,
    data: {
      name: doc.data().name,
      lat: doc.data().latlng.lat,
      lng: doc.data().latlng.lng,
      image: doc.data().image,
    }
  });
}
// dynamically create this on top of generic data?
function setSkateData(doc: any){
  return ({
    id: doc.id,
    data: {
      name: doc.data().name,
      lat: doc.data().latlng.lat,
      lng: doc.data().latlng.lng,
      ramps: doc.data().ramps,
      dropIns: doc.data().dropIns,
      pumpTrack: doc.data().pumpTrack,
      bowl: doc.data().bowl,
      image: doc.data().image,
    }
  });
}

export function MapComponent(props: Props) {
  const { setShowReviewForm } = props;
  const { mapName, refetchMarkers, setRefetchMarkers } = useContext(MapContext);
  const [ data, setData ] = useState(initData);

  async function fetchMarkers() {
    const ref = await fetchMap(mapName);
    if (ref !== null) {
    const markersSnapshot = await getDocs(ref);
      if (!markersSnapshot.empty) {
        const markers = markersSnapshot.docs.map((doc) => (
          mapName === 'skate' ? setSkateData(doc)
          : setGenericData(doc)
        ));
        console.log(`Markers on the ${mapName} map:`, markers);
        setData(markers);                
      } else {
        console.log(`No markers found on the ${mapName} map`);
      }
    }
  }

  useEffect(()=>{
    if (refetchMarkers){
      fetchMarkers();
      setRefetchMarkers(false);
    }
  }, [refetchMarkers, setRefetchMarkers])

  return (
    <StyledMapContainer center={[-27.469, 153.024]} zoom={13} scrollWheelZoom={false} >
      <RenderMapMarkers data={data} setShowReviewForm={setShowReviewForm} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </StyledMapContainer>
  );
}
