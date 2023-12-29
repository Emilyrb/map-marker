import { MapContext } from '../../MapContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { ViewReviews } from '../Map/ViewReviews';
import { AddReviewButton } from '../AddReviewForm/AddReviewButton';

const Container = styled.div`
  width: 100%;
  word-wrap: break-word; 
`;

interface Props {
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidePanel(props: Props) {
  const { setShowReviewForm } = props;
  const { mapName, selectedMarkerId, showMarkerPopUp } = useContext(MapContext);

  return (
    <Container>
      {
        showMarkerPopUp ? 
        <>
          <h1>{showMarkerPopUp.data.name} {mapName} Spot</h1>
          { showMarkerPopUp.reviewsData.length > 0 && <ViewReviews data={showMarkerPopUp.reviewsData} /> }
          {
            mapName === 'skate' ? renderSkateInfo(showMarkerPopUp.data)
            : mapName === 'sesh' ? renderSeshInfo(showMarkerPopUp.data)
            : null
          }
          <AddReviewButton setShowForm={setShowReviewForm}>Add Review:</AddReviewButton>
        </>
        :
        <h1>No location selected</h1>
      }
    </Container>
  )
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
