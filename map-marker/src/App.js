import './App.css';
import { AddMarkerButton, MapComponent, SelectMapForm } from './Components';
import { Container, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {
  const [ showMap, setShowMap ] = useState(false);
  const [ mapName, setMapName ] = useState('');

  useEffect(() => {
  }, [mapName]);
  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous"
      />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Map Marker</Navbar.Brand>
          <Navbar.Text>
            <AddMarkerButton />
          </Navbar.Text>
        </Container>
      </Navbar>
      {
        showMap ? <MapComponent mapName={mapName}/> : <SelectMapForm setMapName={setMapName} setShowMap={setShowMap} />
      }
    </div>
  );
}

export default App;
