import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';

function JasmyNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className='justify-content-start' href="/">Jasmy Market Place</Navbar.Brand>
        {/* <Navbar.Text className='flex-start'> Jasmy Market Place</Navbar.Text> */}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light">Connect Wallet</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JasmyNavbar;