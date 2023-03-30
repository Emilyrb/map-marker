import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin: 0 auto;
  padding: 0;
`;

const StyledForm = styled(Form)`
  width: 100%;
  border-radius: 10px; 
  background-color: rgba(255,255,255,0.7);
  padding: 0;
`;

const StyledRow = styled(Row)`
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

const CloseFormButton = styled.div`
  color: rgba(0,0,0,0.15);
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover {
    color: rgba(0,0,0,0.3);
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
                <FontAwesomeIcon icon={faCircleXmark} />
              </CloseFormButton>
            </Col>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.Name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Emily' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.Date'>
                <Form.Label>Date</Form.Label>
                <Form.Control type='text' placeholder='' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.Location'>
                <Form.Label>Location</Form.Label>
                <Form.Control type='text' placeholder='Kuraby' />
            </Form.Group>
            <Form.Group controlId='form.Address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='1300A Beenleigh Rd, Kuraby QLD 4112' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.BeginnerFriendly'>
              <Form.Label>Beginner Friendly</Form.Label>
              <Form.Control type='text' placeholder='' />
            </Form.Group>
            <Form.Group controlId='form.AdvancedFriendly'>
              <Form.Label>Advanced Friendly</Form.Label>
              <Form.Control type='text' placeholder='' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.Safety'>
              <Form.Label>Safety</Form.Label>
              <Form.Control type='text' placeholder='' />
            </Form.Group>
            <Form.Group controlId='form.Busy'>
              <Form.Label>Busy</Form.Label>
              <Form.Control type='text' placeholder='' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.Ramps'>
              <Form.Label>Ramps</Form.Label>
              <Form.Control type='text' placeholder='2' />
            </Form.Group>
            <Form.Group controlId='form.DropIns'>
              <Form.Label>DropIns</Form.Label>
              <Form.Control type='text' placeholder='3' />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.PumpTrack'>
              <Form.Label>Pump Track</Form.Label>
              <Form.Check type="checkbox" />
            </Form.Group>
            <Form.Group controlId='form.Bowl'>
              <Form.Label>Bowl</Form.Label>
              <Form.Check type="checkbox" />
            </Form.Group>
          </StyledRow>
          <StyledRow>
            <Form.Group controlId='form.OverallRating'>
              <Form.Label>Overall Rating</Form.Label>
              <Form.Control type='text' placeholder='' />
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