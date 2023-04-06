import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ToastPopup } from '../';
import { MapContext } from '../../MapContext';

const StyledContainer = styled(Container)`
  padding: 0;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
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

interface Props {
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectMapForm(props: Props) {
  const { setShowMap } = props;
  const { mapName, setMapName } = useContext(MapContext);
  const [ showErrorPopup, setShowErrorPopup ] = useState(false);

  const [ formData, setFormData ] = useState({name: ''});

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...formData, [key]: value})
  }

  function handleSubmit(e: any) {
    const mapNameValue = formData.name;
    e.preventDefault();
    setMapName(mapNameValue);
    
    if (mapNameValue !== '') {
      if (mapNameValue === 'skate') {
        setShowMap(true);
        setShowErrorPopup(false);
      } else {
        setShowErrorPopup(true);
      }
    }
}

    return (
      <>
        <StyledContainer>
          <StyledForm onSubmit={handleSubmit} id='selectMapForm'>
            <StyledRow>
              <Col><h1>Map name</h1></Col>
            </StyledRow>
            <StyledRow>
              <Form.Group as={Col} controlId='name'>
                <Form.Label>Which map do you want to view?</Form.Label>
                <Form.Control type='text' placeholder='Name' onChange={handleChange} />
              </Form.Group>
            </StyledRow>
            <Button variant='primary' type='submit' form='selectMapForm'>
              Submit
            </Button>
          </StyledForm>
        </StyledContainer>
        {
          showErrorPopup ? <ToastPopup setShowToast={setShowErrorPopup} headerText={'Error'} bodyText={`${mapName} map does not exist`} /> : null
        }
      </>
    );
}
