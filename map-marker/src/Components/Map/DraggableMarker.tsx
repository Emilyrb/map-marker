import { Marker } from 'react-leaflet';
import { useContext, useMemo, useRef } from 'react';
import L from 'leaflet';
import { MapContext } from '../../MapContext';

interface Props{
  userLocation: {lat: number, lng: number};
};

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function DraggableMarker(props: Props) {
  const { userLocation } = props;
  const { setSelectedMarkerPos } = useContext(MapContext);
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setSelectedMarkerPos(marker.getLatLng());
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
      ref={markerRef}
      icon={redIcon}
    />
  );
}
