import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import ConnectWallet from './connectWallet';
import { useState, useEffect } from 'react';


function JasmyNavbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () =>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className='justify-content-start' href="/">Jasmy Market Place</Navbar.Brand>
        {/* <Navbar.Text className='flex-start'> Jasmy Market Place</Navbar.Text> */}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light" onClick={handleOpen}>Wallet</Button>
        <ConnectWallet open={open} onClose = {handleClose} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JasmyNavbar;