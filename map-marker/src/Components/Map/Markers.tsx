import { Marker, Popup } from "react-leaflet";
import { AddReviewButton } from "../AddReviewForm/AddReviewButton";
import { getDocs, collection, where, query } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { useContext, useEffect, useState } from "react";
import { FetchReviewsDTO, MarkersDTO } from "../../Types";
import { ViewReviews } from "./ViewReviews";
import { MapContext } from "../../MapContext";

interface Props{
  id: string;
  data: MarkersDTO;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const initData: FetchReviewsDTO[] = [];

export function Markers(props: Props){
  const { id, data, setShowReviewForm } = props;
  const { setSelectedMarkerId } = useContext(MapContext);
  console.log('id of marker', data.name, 'is ', id);
  const [ reviewsData, setReviewsData ] = useState(initData);
  
  async function fetchReviews() {
    const selectedMapName = 'skate';
    const mapRef = collection(firestore, 'maps3');
    const mapQuery = query(mapRef, where('mapName', '==', selectedMapName));
    const mapSnapshot = await getDocs(mapQuery);

    if (!mapSnapshot.empty) {
      const mapDoc = mapSnapshot.docs[0];
      const reviewsRef = collection(firestore, 'maps3', mapDoc.id ,'markers', id, 'reviews');
      const reviewsSnapshot = await getDocs(reviewsRef);

      if (!reviewsSnapshot.empty) {
        const reviews = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: {
            username: doc.data().username,
            date: doc.data().username,
            time: doc.data().time,
            beginnerFriendly: doc.data().beginnerFriendly,
            advancedFriendly: doc.data().advancedFriendly,
            safety: doc.data().safety,
            busy: doc.data().busy,
            comment: doc.data().comment,
            overallRating: doc.data().overallRating,
          }
        }));
        console.log(`Reviews on the ${selectedMapName} marker:`, reviews);
        setReviewsData(reviews);                
      } else {
        console.log(`No markers found on the ${selectedMapName} map.`);
      }
    }  else {
      console.log(`${data.name} marker has no reviews`);
    }
  }


  useEffect(()=>{
    fetchReviews();
  }, []);

  return (
    <Marker
    position={[data.lat, data.lng]} 
    eventHandlers={{
      click: () => {
        console.log('setting marker to', id);
        setSelectedMarkerId(id);
      },
    }}
  >
    <Popup>
      <h2>{data.name} Skate Park</h2>
      <p>ramps: {data.ramps}</p>
      <p>drop ins: {data.dropIns}</p>
      <p>has pump track? {data.pumpTrack === 'on' ? 'Yes' : 'No'}</p>
      <p>has bowl? {data.bowl === 'on'? 'Yes' : 'No'}</p>
      <AddReviewButton setShowForm={setShowReviewForm}>Add Review:</AddReviewButton>
      <ViewReviews data={reviewsData} />
    </Popup>
  </Marker>
  );
}