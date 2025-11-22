import { useMap } from "react-leaflet";
import { DraggableMarker } from './DraggableMarker';
import { Markers } from './Markers';
import { useContext, useEffect, useState } from "react";
import { FetchMarkersDTO } from "../../Types";
import { MapContext } from "../../MapContext";

type Props = {
  data: FetchMarkersDTO[],
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RenderMapMarkers(props: Props) {
  const { data, setShowReviewForm } = props;
  const [ userLocation, setUserLocation ] = useState(false);
    const { setNewMarkerPos } = useContext(MapContext);

  const map = useMap();
  useEffect(() => {
    if (!userLocation){
      map.locate().on('locationfound', function (e: any) {
        setUserLocation(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setNewMarkerPos(e.latlng);
        console.log('set initial location to e.latlng', e.latlng);
      });
      map.on('locationerror', () => alert('user denied access to location'));
  
    }
  }, []);
  return (
    <>
          {
        userLocation && <DraggableMarker />
      }
      {
        data.length > 0 ? 
          data.map(marker => (
              <Markers
                key={marker.id}
                id={marker.id}
                data={marker.data}
                setShowReviewForm={setShowReviewForm}
              />
          ))
          : null /* loading screen */
      }
      </>
  );
}