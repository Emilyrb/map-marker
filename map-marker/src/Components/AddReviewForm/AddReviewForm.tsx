import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { StarRating } from '../AddMarkerForm/StarRating';

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

const StyledCheckbox = styled(Form.Check)`
  transform: scale(1.5);
  height: 30px;
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
  markerToAddReview: {lat: number, lng: number};
}

export function AddReviewForm(props: Props) {
  const { setShowForm, markerToAddReview } = props;
  const [ formData, setFormData ] = useState({
    'form.Name': '',
    'form.Date': '',
    'form.Time': '',
    'form.BeginnerFriendly': '',
    'form.AdvancedFriendly': '',
    'form.Safety': '',
    'form.Busy': '',
    'form.Ramps': '',
    'form.DropIns': '',
    'form.PumpTrack': '',
    'form.Bowl': '',
    'form.OverallRating': '',
  })

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...formData, [key]: value})
  }

  function handleStarChange(){

  }

  function handleSubmit(e: any) {
    console.log('marker pos is', markerToAddReview);
    e.preventDefault();
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
            <Form.Group as={Col} controlId='form.Name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Emily' onChange={handleChange} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Date'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='form.Time'>
              <Form.Label>Time</Form.Label>
              <Form.Control type='time' onChange={handleChange} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.BeginnerFriendly'>
              <Form.Label>Beginner Friendly</Form.Label>
              <StarRating value={0} />
            </Form.Group>
            <Form.Group as={Col} controlId='form.AdvancedFriendly'>
              <Form.Label>Advanced Friendly</Form.Label>
              <StarRating value={0} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Safety'>
              <Form.Label>Safety</Form.Label>
              <StarRating value={0} />
            </Form.Group>
            <Form.Group as={Col}controlId='form.Busy'>
              <Form.Label>Busy</Form.Label>
              <StarRating value={0} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Ramps'>
              <Form.Label>Ramps</Form.Label>
              <Form.Control type='text' placeholder='2' onChange={handleChange}/>
            </Form.Group>
            <Form.Group as={Col} controlId='form.DropIns'>
              <Form.Label>Drop Ins</Form.Label>
              <Form.Control type='text' placeholder='3' onChange={handleChange}/>
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.PumpTrack'>
              <Form.Label>Pump Track</Form.Label>
              <div>
                <StyledCheckbox type='checkbox' id='form.PumpTrack' onChange={handleChange}/>
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId='form.Bowl'>
              <Form.Label>Bowl</Form.Label>
              <div>
                <StyledCheckbox type='checkbox' id='form.Bowl' onChange={handleChange}/>
              </div>
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.OverallRating'>
              <Form.Label>Overall Rating</Form.Label>
              <StarRating value={0} />
            </Form.Group>
          </StyledRow>
          <Button variant='primary' type='submit' form='addReviewForm'>
            Submit
          </Button>
        </StyledForm>
      </StyledContainer>
    );
}
