import { Marker } from 'react-leaflet';
import { useMemo, useRef } from 'react';

interface Props{
  userLocation: {lat: number, lng: number};
  setMarkerPos: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
};

export function DraggableMarker(props: Props) {
  const { userLocation, setMarkerPos } = props;
  console.log(userLocation);
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setMarkerPos(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={userLocation}
      ref={markerRef}>
    </Marker>
  );
}
