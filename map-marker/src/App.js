import './App.css';
import { AddMarkerButton, MapComponent, SelectMapForm, AddReviewForm, SidePanel } from './Components';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { MapContext } from './MapContext';
import styled from 'styled-components';

const ContentContainer = styled(Container)`
  max-width: 100% !important;
  height: calc(100dvh - 66px);
  max-height: calc(100dvh - 66px);
`;

const StyledCol = styled(Col)`
  margin: 0 !important;
  padding: 0 !important;
`;

const StyledRow = styled(Row)`
  height: 100%;
  flex-grow: 0;
  flex: 0;
`;

const StyledColMap = styled(StyledCol)`
  @media (min-width: 768px) {
    height: 100%;
  }
  height: 50%;
`;

function App() {
  const [ showMap, setShowMap ] = useState(false);
  const [ showReviewForm, setShowReviewForm ] = useState(false);
  const { mapName } = useContext(MapContext);

  return (
    <div className='App'>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
        integrity='sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS'
        crossorigin='anonymous'
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>{mapName} Map Marker</Navbar.Brand>
          <Navbar.Text>
            {
              showMap ? <AddMarkerButton /> : null 
            }
          </Navbar.Text>
        </Container>
      </Navbar>
      <ContentContainer>
        {
          showMap ?
            <StyledRow>
              <StyledColMap md={9} xs={12}>
                <MapComponent setShowReviewForm={setShowReviewForm} />
              </StyledColMap>
              <StyledCol md={3} xs={12}>
                <SidePanel setShowReviewForm={setShowReviewForm} />
              </StyledCol>
            </StyledRow>
            : <SelectMapForm setShowMap={setShowMap} />
        }
        {
          showReviewForm ? <AddReviewForm setShowForm={setShowReviewForm} /> : null
        }
      </ContentContainer>
    </div>
  );
}

export default App;
