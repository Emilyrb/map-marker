import { MapContext } from '../../MapContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { ViewReviews } from '../Map/ViewReviews';
import { AddReviewButton } from '../AddReviewForm/AddReviewButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  word-wrap: break-word; 
  overflow-y: auto;
  max-height: 100%;
  padding: 10px 10px;
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

const MarkerImage = styled.img`
  max-width: 80%;
  max-height: 400px;
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
          <h1>{showMarkerPopUp.data.name} {mapName} spot</h1>
          <SubContainer>
            {showMarkerPopUp.data.image !== undefined && <><SubHeader>Image</SubHeader><DetailsText><MarkerImage src={showMarkerPopUp.data.image} alt='the spot' /></DetailsText></>}
          </SubContainer>
          <SubContainer>
            {mapName === 'skate' && <SubHeader>Details</SubHeader>}
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
      <DetailsText>ramps: {data.ramps || 'N/A'}</DetailsText>
      <DetailsText>drop ins: {data.dropIns || 'N/A'}</DetailsText>
      <DetailsText>has pump track? {data.pumpTrack === 'on' ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</DetailsText>
      <DetailsText>has bowl? {data.bowl === 'on'? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</DetailsText>
    </>
  );
}
    </>
  );
}
