import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';

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

interface Props {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    markerPos: {lat: number, lng: number};
}

export function AddMarkerForm(props: Props) {
    const { setShowForm, markerPos } = props;
    const [ formData, setFormData ] = useState({
      'form.Location': '',
      'form.Address': '',
      'form.Image': '',
  })

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...formData, [key]: value})
  }

  function handleSubmit(e: any) {
    console.log('submit marker at', markerPos);
    e.preventDefault();
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
            <Form.Group as={Col} controlId='form.Location'>
                <Form.Label>Location</Form.Label>
                <Form.Control type='text' placeholder='Kuraby' onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='form.Address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='1300A Beenleigh Rd, Kuraby QLD 4112' onChange={handleChange}/>
            </Form.Group>
          </StyledRow>
          <StyledRow>
          <Form.Group controlId="form.Image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          </StyledRow>
          <Button variant="primary" type="submit" form="addMarkerForm">
            Submit
          </Button>
        </StyledForm>
      </StyledContainer>
    );
}
