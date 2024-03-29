import { useState, createContext } from 'react';
import { AllMarkersDTO, FetchReviewsDTO } from './Types';

interface IMapContext {
  mapName: string;
  setMapName: React.Dispatch<React.SetStateAction<string>>;
  newMarkerPos: {lat: number, lng: number};
  setNewMarkerPos: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
  selectedMarkerId: string;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<string>>;
  refetchMarkers: boolean;
  setRefetchMarkers: React.Dispatch<React.SetStateAction<boolean>>;
  refetchReviews: boolean;
  setRefetchReviews: React.Dispatch<React.SetStateAction<boolean>>;
  showMarkerPopUp: {data: AllMarkersDTO, reviewsData: FetchReviewsDTO[]} | null
  setShowMarkerPopUp: React.Dispatch<React.SetStateAction<{data: AllMarkersDTO, reviewsData: FetchReviewsDTO[]} | null>>;
}

export const MapContext = createContext<IMapContext>({
  mapName: '',
  setMapName: () => {},
  newMarkerPos: {lat: 0, lng: 0},
  setNewMarkerPos: () => {},
  selectedMarkerId: '',
  setSelectedMarkerId: () => {},
  refetchMarkers: true,
  setRefetchMarkers: () => {},
  refetchReviews: true,
  setRefetchReviews: () => {},
  showMarkerPopUp: null,
  setShowMarkerPopUp: () => {},
});


export const MapProvider = (props: any) => {
  const [mapName, setMapName] = useState('');
  const [newMarkerPos, setNewMarkerPos] = useState({lat: 0, lng: 0});
  const [selectedMarkerId, setSelectedMarkerId] = useState('');
  const [refetchMarkers, setRefetchMarkers] = useState(true);
  const [refetchReviews, setRefetchReviews] = useState(false);
  const [showMarkerPopUp, setShowMarkerPopUp] = useState<{data: AllMarkersDTO, reviewsData: FetchReviewsDTO[]} | null>(null);

  return (
    <MapContext.Provider 
      value={{
        mapName,
        setMapName,
        newMarkerPos,
        setNewMarkerPos,
        selectedMarkerId,
        setSelectedMarkerId,
        refetchMarkers,
        setRefetchMarkers,
        refetchReviews,
        setRefetchReviews,
        showMarkerPopUp,
        setShowMarkerPopUp
      }}>
      {props.children}
    </MapContext.Provider>
  );
};
