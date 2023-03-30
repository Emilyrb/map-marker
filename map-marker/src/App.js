import './App.css';
import { AddMarkerButton, MapComponent } from './Components';
import { Container, Navbar } from 'react-bootstrap';

function App() {
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
      <MapComponent />
    </div>
  );
}

export default App;
