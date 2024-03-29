import { Marker } from "react-leaflet";
import { getDocs, collection, where, query } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';
import { useContext, useEffect, useState } from "react";
import { AllMarkersDTO, FetchReviewsDTO } from "../../Types";
import { MapContext } from "../../MapContext";

interface Props{
  id: string;
  data: AllMarkersDTO;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function setGenericData(doc: any){
  return ({
    id: doc.id,
    data: {
      username: doc.data().username,
      date: doc.data().date,
      time: doc.data().time,
      comment: doc.data().comment,
      overallRating: doc.data().overallRating,
      image: doc.data().image,
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
      image: doc.data().image,
    }
  });
}

export function Markers(props: Props){
  const { id, data } = props;
  const { selectedMarkerId, setSelectedMarkerId, mapName, refetchReviews, setRefetchReviews, setShowMarkerPopUp } = useContext(MapContext);
  // console.log('id of marker', data.name, 'is ', id);
  
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
          const reviews: FetchReviewsDTO[] = reviewsSnapshot.docs.map((doc) => (
            mapName === 'skate' ? setSkateData(doc)
            : setGenericData(doc)
          ));
          console.log(`Reviews on the ${mapName} marker:`, reviews);
          setShowMarkerPopUp({data, reviewsData: reviews});
        } else {
          console.log(`No reviews found on this marker on the ${mapName} map.`);
          setShowMarkerPopUp({data, reviewsData: []});
        }
      }  else {
        console.log(`${mapName} map not found`);
      }
    }
  }
  useEffect(() => {
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
  </Marker>
  );
}
