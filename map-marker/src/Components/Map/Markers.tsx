import { Marker, Popup } from "react-leaflet";
import { AddReviewButton } from "../AddReviewForm/AddReviewButton";

interface Props{
  pos: [lat: number, lng: number];
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
}

export function Markers(props: Props){
  const { pos, setShowReviewForm, setSelectedMarker } = props;
  return (
    <Marker
    position={pos} 
    eventHandlers={{
      click: (e) => {
        setSelectedMarker(e.latlng);
      },
    }}
  >
    <Popup>
      'name of skate park here' has x reviews,
      Add Review:
      <AddReviewButton setShowForm={setShowReviewForm} />
    </Popup>
  </Marker>

  );
}