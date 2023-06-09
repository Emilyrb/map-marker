import { Marker, Popup } from "react-leaflet";
import { AddReviewButton } from "../AddReviewForm/AddReviewButton";
import { getDocs, collection, where, query } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { useContext, useEffect, useState } from "react";
import { FetchReviewsDTO, AllMarkersDTO } from "../../Types";
import { ViewReviews } from "./ViewReviews";
import { MapContext } from "../../MapContext";

interface Props{
  id: string;
  data: AllMarkersDTO;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const initData: FetchReviewsDTO[] = [];

function setGenericData(doc: any){
  return ({
    id: doc.id,
    data: {
      username: doc.data().username,
      date: doc.data().date,
      time: doc.data().time,
      comment: doc.data().comment,
      overallRating: doc.data().overallRating,
    }
  });
}
// dynamically create this on top of generic data?
function setSkateData(doc: any){
  return ({
    id: doc.id,
    data: {
      username: doc.data().username,
      date: doc.data().date,
      time: doc.data().time,
      beginnerFriendly: doc.data().beginnerFriendly,
      advancedFriendly: doc.data().advancedFriendly,
      safety: doc.data().safety,
      busy: doc.data().busy,
      comment: doc.data().comment,
      overallRating: doc.data().overallRating,
    }
  });
}

export function Markers(props: Props){
  const { id, data, setShowReviewForm } = props;
  const { selectedMarkerId, setSelectedMarkerId, mapName, refetchReviews, setRefetchReviews } = useContext(MapContext);
  // console.log('id of marker', data.name, 'is ', id);
  const [ reviewsData, setReviewsData ] = useState(initData);
  
  async function fetchReviews() {
    if (id === selectedMarkerId){
      const mapRef = collection(firestore, 'maps3');
      const mapQuery = query(mapRef, where('mapName', '==', mapName));
      const mapSnapshot = await getDocs(mapQuery);

      if (!mapSnapshot.empty) {
        const mapDoc = mapSnapshot.docs[0];
        const reviewsRef = collection(firestore, 'maps3', mapDoc.id ,'markers', selectedMarkerId, 'reviews');
        const reviewsSnapshot = await getDocs(reviewsRef);

        if (!reviewsSnapshot.empty) {
          const reviews = reviewsSnapshot.docs.map((doc) => (
            mapName === 'skate' ? setSkateData(doc)
            : setGenericData(doc)
          ));
          console.log(`Reviews on the ${mapName} marker:`, reviews);
          setReviewsData(reviews);
          
        } else {
          console.log(`No reviews found on this marker on the ${mapName} map.`);
        }
      }  else {
        console.log(`${data.name} marker has no reviews`);
      }
    }
  }
  useEffect(()=>{
    if (refetchReviews){
      fetchReviews();
      setRefetchReviews(false);
    }
  }, [refetchReviews, setRefetchReviews]);
  
  return (
    <Marker
    position={[data.lat, data.lng]} 
    eventHandlers={{
      click: () => {
        console.log('setting marker to', id);
        setSelectedMarkerId(id);
        setRefetchReviews(true);
      },
    }}
  >
    <Popup>
      <h2>{data.name} {mapName} Spot</h2>
      { reviewsData.length > 0 && <ViewReviews data={reviewsData} /> }
      {
        mapName === 'skate' ? renderSkateInfo(data)
        : null
      }
      <AddReviewButton setShowForm={setShowReviewForm}>Add Review:</AddReviewButton>
    </Popup>
  </Marker>
  );
}

function renderSkateInfo(data: any){
  return (
    <>
      <p>ramps: {data.ramps}</p>
      <p>drop ins: {data.dropIns}</p>
      <p>has pump track? {data.pumpTrack === 'on' ? 'Yes' : 'No'}</p>
      <p>has bowl? {data.bowl === 'on'? 'Yes' : 'No'}</p>
    </>
  );
}
