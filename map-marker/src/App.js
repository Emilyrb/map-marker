import './App.css';
import { AddMarkerButton, MapComponent, SelectMapForm, AddReviewForm } from './Components';
import { Container, Navbar } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [ showMap, setShowMap ] = useState(false);
  const [ showReviewForm, setShowReviewForm ] = useState(false);

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
          <Navbar.Brand href='#home'>Map Marker</Navbar.Brand>
          <Navbar.Text>
            {
              showMap ? <AddMarkerButton /> : null 
            }
          </Navbar.Text>
        </Container>
      </Navbar>
      {
        showMap ?
          <MapComponent setShowReviewForm={setShowReviewForm} />
          : <SelectMapForm setShowMap={setShowMap} />
      }
      {
        showReviewForm ? <AddReviewForm setShowForm={setShowReviewForm} /> : null
      }
    </div>
  );
}

export default App;
