import { MapContext } from '../../MapContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { ViewReviews } from '../Map/ViewReviews';
import { AddReviewButton } from '../AddReviewForm/AddReviewButton';

const Container = styled.div`
  width: 100%;
  word-wrap: break-word; 
  overflow-y: auto;
`;

const SubContainer = styled.div`
  margin: 20px 0;
`;

const SubHeader = styled.h4`
  margin: 0;
`;

const DetailsText = styled.p`
  margin: 0;
  padding: 5px 0;
`;

interface Props {
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidePanel(props: Props) {
  const { setShowReviewForm } = props;
  const { mapName, showMarkerPopUp } = useContext(MapContext);

  return (
    <Container>
      {
        showMarkerPopUp ? 
        <>
          <h1>{showMarkerPopUp.data.name} {mapName} Spot</h1>
          <SubContainer>
            <SubHeader>Details</SubHeader>
            {
              mapName === 'skate' ? renderSkateInfo(showMarkerPopUp.data)
              : null
            }
          </SubContainer>
          { showMarkerPopUp.reviewsData.length > 0 && 
            <SubContainer>
              <ViewReviews data={showMarkerPopUp.reviewsData} />
            </SubContainer>
          }
          <SubContainer>
            <AddReviewButton setShowForm={setShowReviewForm}>Add your review </AddReviewButton>
          </SubContainer>
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
      <DetailsText>ramps: {data.ramps}</DetailsText>
      <DetailsText>drop ins: {data.dropIns}</DetailsText>
      <DetailsText>has pump track? {data.pumpTrack === 'on' ? 'Yes' : 'No'}</DetailsText>
      <DetailsText>has bowl? {data.bowl === 'on'? 'Yes' : 'No'}</DetailsText>
    </>
  );
}
    </>
  );
}
