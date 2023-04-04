import { useState, createContext } from 'react';

interface IMapContext {
  mapName: string;
  setMapName: React.Dispatch<React.SetStateAction<string>>;
  selectedMarkerPos: {lat: number, lng: number};
  setSelectedMarkerPos: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
  selectedMarkerId: string;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<string>>;
}

export const MapContext = createContext<IMapContext>({
  mapName: '',
  setMapName: () => {},
  selectedMarkerPos: {lat: 0, lng: 0},
  setSelectedMarkerPos: () => {},
  selectedMarkerId: '',
  setSelectedMarkerId: () => {},
});


export const MapProvider = (props: any) => {
  const [mapName, setMapName] = useState('');
  const [selectedMarkerPos, setSelectedMarkerPos] = useState({lat: 0, lng: 0});
  const [selectedMarkerId, setSelectedMarkerId] = useState('');

  return (
    <MapContext.Provider value={{ mapName, setMapName, selectedMarkerPos, setSelectedMarkerPos, selectedMarkerId, setSelectedMarkerId }}>
      {props.children}
    </MapContext.Provider>
  );
};
