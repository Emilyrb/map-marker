import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { StarRating } from '../AddMarkerForm/StarRating';
import { firestore } from '../../firebase_setup/firebase';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore';
import { MapContext } from '../../MapContext';

const StyledContainer = styled(Container)`
  padding: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
`;

const StyledForm = styled(Form)`
  width: 100%;
  border-radius: 10px; 
  background-color: rgba(255,255,255,0.9);
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

interface Props{
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddReviewForm(props: Props) {
  const { setShowForm } = props;
  const { selectedMarkerId, mapName } = useContext(MapContext);
  const [ formData, setFormData ] = useState({
    username: '',
    date: '',
    time: '',
    beginnerFriendly: 0,
    advancedFriendly: 0,
    safety: 0,
    busy: 0,
    comment: '',
    overallRating: 0,
  })
  const [ beginnerFriendlyVal, setBeginnerFriendlyVal ] = useState(0);
  const [ advancedFriendlyVal, setAdvancedFriendlyVal ] = useState(0);
  const [ safetyVal, setSafetyVal ] = useState(0);
  const [ busyVal, setBusyVal ] = useState(0);
  const [ overallRatingVal, setOverallRatingVal ] = useState(0);
  

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...formData, [key]: value})
  }

  async function addReview() {
  const mapRef = collection(firestore, 'maps3');
  const mapQuery = query(mapRef, where('mapName', '==', mapName));
  const mapSnapshot = await getDocs(mapQuery);

  if (!mapSnapshot.empty) {
    const mapDoc = mapSnapshot.docs[0];
    const markersRef = collection(firestore, 'maps3', mapDoc.id, 'markers', selectedMarkerId, 'reviews');

    try {
      await addDoc(markersRef, formData);
      console.log(`New review added to the ${selectedMarkerId} marker`);
      setShowForm(false);
    } catch (error) {
      console.log(`Error adding review to marker ${selectedMarkerId} `, error);
    }
  } else {
    console.log(`Marker ${selectedMarkerId} does not exist...`);
  }
};

  function handleSubmit(e: any) {
    console.log('marker pos is', selectedMarkerId);
    e.preventDefault();

    console.log('handling submit');
    addReview();
  };

    return (
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit} id='addReviewForm'>
          <StyledRow>
            <Col><h1>Add Review</h1></Col>
            <Col xs={1}>
              <CloseFormButton onClick={() => {setShowForm(false)}}>
                <FontAwesomeIcon icon={faCircleXmark} size='2xl' />
              </CloseFormButton>
            </Col>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Emily' onChange={handleChange} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='time'>
              <Form.Label>Time</Form.Label>
              <Form.Control type='time' onChange={handleChange} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='beginnerFriendly'>
              <Form.Label>Beginner Friendly</Form.Label>
              <StarRating rating={beginnerFriendlyVal} setRating={setBeginnerFriendlyVal} formData={formData} setFormData={setFormData} keyId={'beginnerFriendly'} />
            </Form.Group>
            <Form.Group as={Col} controlId='advancedFriendly'>
              <Form.Label>Advanced Friendly</Form.Label>
              <StarRating rating={advancedFriendlyVal} setRating={setAdvancedFriendlyVal} formData={formData} setFormData={setFormData} keyId={'advancedFriendly'} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='safety'>
              <Form.Label>Safety</Form.Label>
              <StarRating rating={safetyVal} setRating={setSafetyVal} formData={formData} setFormData={setFormData} keyId={'safety'} />
            </Form.Group>
            <Form.Group as={Col}controlId='busy'>
              <Form.Label>Busy</Form.Label>
              <StarRating rating={busyVal} setRating={setBusyVal} formData={formData} setFormData={setFormData} keyId={'busy'} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='username'>
              <Form.Label>Comment</Form.Label>
              <Form.Control type='textarea' placeholder='Not bad!' onChange={handleChange} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='overallRating'>
              <Form.Label>Overall Rating</Form.Label>
              <StarRating rating={overallRatingVal} setRating={setOverallRatingVal} formData={formData} setFormData={setFormData} keyId={'overallRating'} />
            </Form.Group>
          </StyledRow>
          <Button variant='primary' type='submit' form='addReviewForm'>
            Submit
          </Button>
        </StyledForm>
      </StyledContainer>
    );
}
