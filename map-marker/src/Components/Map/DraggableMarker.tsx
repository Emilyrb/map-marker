import { Marker } from 'react-leaflet';
import { useContext, useMemo, useRef } from 'react';
import L from 'leaflet';
import { MapContext } from '../../MapContext';

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

export function DraggableMarker() {
  const { newMarkerPos, setNewMarkerPos } = useContext(MapContext);
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng()
          const lat = latlng.lat;
          const lng = latlng.lng;
          setNewMarkerPos({lat: lat+0.0001, lng: lng+0.0001});
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={newMarkerPos}
      ref={markerRef}
      icon={redIcon}
    />
  );
}
