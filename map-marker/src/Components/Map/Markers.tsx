import { Marker, Popup } from "react-leaflet";
import { AddReviewButton } from "../AddReviewForm/AddReviewButton";
import { getDocs, collection, where, query } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { useEffect, useState } from "react";
import { FetchReviewsDTO } from "../../Types";
import { ViewReviews } from "./ViewReviews";

interface Props{
  id: string;
  name: string;
  pos: [lat: number, lng: number];
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<string>>;
}

const initData: FetchReviewsDTO[] = [];

export function Markers(props: Props){
  const { id, name, pos, setShowReviewForm, setSelectedMarkerId } = props;
  console.log('id of marker', name, 'is ', id);
  const [ data, setData ] = useState(initData);
  
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
            ramps: doc.data().ramps,
            dropIns: doc.data().dropIns,
            pumpTrack: doc.data().pumpTrack,
            bowl: doc.data().bowl,
            overallRating: doc.data().overallRating,
          }
        }));
        console.log(`Reviews on the ${selectedMapName} marker:`, reviews);
        setData(reviews);                
      } else {
        console.log(`No markers found on the ${selectedMapName} map.`);
      }
    }  else {
      console.log(`${name} marker has no reviews`);
    }
  }


  useEffect(()=>{
    fetchReviews();
  }, []);

  return (
    <Marker
    position={pos} 
    eventHandlers={{
      click: () => {
        console.log('setting marker to', id);
        setSelectedMarkerId(id);
      },
    }}
  >
    <Popup>
      <h2>{name} Skate Park</h2>
      <a href='#'>View {data.length} reviews</a>
      <p>Add Review:</p>
      <AddReviewButton setShowForm={setShowReviewForm} />
      <AddReviewButton setShowForm={setShowReviewForm}>Add Review:</AddReviewButton>
      <ViewReviews data={data} />
    </Popup>
  </Marker>
  );
}