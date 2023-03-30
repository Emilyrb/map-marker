import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { StarRating } from './StarRating';

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
  padding: 0;
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

interface Props {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddMarkerForm(props: Props) {
    const { setShowForm } = props;

    return (
      <StyledContainer>
        <StyledForm>
          <StyledRow>
            <Col><h1>Add Skate Park Marker</h1></Col>
            <Col xs={1}>
              <CloseFormButton onClick={() => {setShowForm(false)}}>
                <FontAwesomeIcon icon={faCircleXmark} size='2xl' />
              </CloseFormButton>
            </Col>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Emily' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Date'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' />
            </Form.Group>
            <Form.Group as={Col} controlId='form.Time'>
              <Form.Label>Time</Form.Label>
              <Form.Control type='time' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.Location'>
                <Form.Label>Location</Form.Label>
                <Form.Control type='text' placeholder='Kuraby' />
            </Form.Group>
            <Form.Group as={Col} controlId='form.Address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='1300A Beenleigh Rd, Kuraby QLD 4112' />
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
              <Form.Control type='text' placeholder='2' />
            </Form.Group>
            <Form.Group as={Col} controlId='form.DropIns'>
              <Form.Label>DropIns</Form.Label>
              <Form.Control type='text' placeholder='3' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.PumpTrack'>
              <Form.Label>Pump Track</Form.Label>
              <div>
                <StyledCheckbox type="checkbox" id="form.PumpTrack" />
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId='form.Bowl'>
              <Form.Label>Bowl</Form.Label>
              <div>
                <StyledCheckbox type="checkbox" id="form.Bowl" />
              </div>
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group as={Col} controlId='form.OverallRating'>
              <Form.Label>Overall Rating</Form.Label>
              <StarRating value={0} />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </StyledRow>
        </StyledForm>
      </StyledContainer>
    );
}
