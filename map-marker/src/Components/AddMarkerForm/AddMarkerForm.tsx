import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase_setup/firebase';

const StyledContainer = styled(Container)`
  padding: 0;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10000;
`;

const StyledForm = styled(Form)`
  width: 100%;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.8);
  padding: 10px;
  color: black;
`;

const StyledRow = styled(Row)`
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

const CloseFormButton = styled.div`
  color: rgba(0,0,0,0.25);
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover {
    color: rgba(0,0,0,0.4);
  }
`;

const StyledCheckbox = styled(Form.Check)`
  transform: scale(1.5);
  height: 30px;
`;


interface Props {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    markerPos: {lat: number, lng: number};
}

export function AddMarkerForm(props: Props) {
    const { setShowForm, markerPos } = props;
    const [ formData, setFormData ] = useState({
      id: '',
      name: '',
      address: '',
      image: '',
      latlng: {lat: 0, lng: 0},
  })

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...formData, [key]: value});
    setFormData(prevState => ({
      ...prevState,
      'latlng': {lat: markerPos['lat'], lng: markerPos['lng']},
    }));
  }

  async function addMarker() {
    const selectedMapName = 'skate';
    const mapRef = collection(firestore, 'maps3');
    const mapQuery = query(mapRef, where('mapName', '==', selectedMapName));
    const mapSnapshot = await getDocs(mapQuery);
  
    if (!mapSnapshot.empty) {
      const mapDoc = mapSnapshot.docs[0];
      const markersRef = collection(firestore, 'maps3', mapDoc.id, 'markers');

      try {
        await addDoc(markersRef, formData);
        console.log(`New marker added to the ${selectedMapName} map`);
      } catch (error) {
        console.error(`Error adding marker to the ${selectedMapName} map`, error);
      }
    } else {
      console.log(`The ${selectedMapName} map does not exist.`);
    }
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    addMarker();
    setShowForm(false);
  }

    return (
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit} id='addMarkerForm' >
          <StyledRow>
            <Col><h1>Add Marker</h1></Col>
            <Col xs={1}>
              <CloseFormButton onClick={() => {setShowForm(false)}}>
                <FontAwesomeIcon icon={faCircleXmark} size='2xl' />
              </CloseFormButton>
            </Col>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Kuraby' onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='1300A Beenleigh Rd, Kuraby QLD 4112' onChange={handleChange}/>
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='ramps'>
              <Form.Label>Ramps</Form.Label>
              <Form.Control type='text' placeholder='2' onChange={handleChange}/>
            </Form.Group>
            <Form.Group as={Col} controlId='dropIns'>
              <Form.Label>Drop Ins</Form.Label>
              <Form.Control type='text' placeholder='3' onChange={handleChange}/>
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='pumpTrack'>
              <Form.Label>Pump Track</Form.Label>
              <div>
                <StyledCheckbox type='checkbox' id='pumpTrack' onChange={handleChange}/>
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId='bowl'>
              <Form.Label>Bowl</Form.Label>
              <div>
                <StyledCheckbox type='checkbox' id='bowl' onChange={handleChange}/>
              </div>
            </Form.Group>
          </StyledRow>
          <StyledRow>
          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" disabled />
          </Form.Group>
          </StyledRow>
          <Button variant="primary" type="submit" form="addMarkerForm">
            Submit
          </Button>
        </StyledForm>
      </StyledContainer>
    );
}
