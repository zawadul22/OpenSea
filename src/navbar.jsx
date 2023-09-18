import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import ConnectWallet from './connectWallet';
import { useState, useEffect } from 'react';
import { ShoppingCart, Wallet } from '@mui/icons-material';
import './navbar.css'

function JasmyNavbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () =>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark" >
        <div id='brand' className='container'>

        <Navbar.Brand  href="/">Jasmy Market Place</Navbar.Brand>
        </div>
       <div id='brand2' className='container'>
        <Button variant="outline-light" onClick={handleOpen}> <Wallet/> </Button>&nbsp;&nbsp;
        <ConnectWallet open={open} onClose = {handleClose} />
        <Button variant='outline-light'> <ShoppingCart/> </Button>
        </div>

    </Navbar>
  );
}

export default JasmyNavbar;