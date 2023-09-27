import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import ConnectWallet from './connectWallet';
import { useState, useEffect } from 'react';
import { ShoppingCart, Wallet } from '@mui/icons-material';
import NFTMint from './NFTMint.jsx';
import NFTMintv2 from './NFTMintv2';
import './navbar.css'

function JasmyNavbar(props) {
  const [open, setOpen] = useState(false);
  const [mint, setMint] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleMintOpen = () => {
    setMint(true);
  }

  const handleMintClose = () => {
    setMint(false);
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" >
      <div id='brand' className='container'>
        <Navbar.Brand href="/">Jasmy Market Place</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link onClick={handleMintOpen}>Mint</Nav.Link>
          <NFTMint mint={mint} onClose={handleMintClose}
            isLog={props.isLog}
            meta={props.meta}
          />
          <Nav.Link href='/mint2'>Mint 2.0</Nav.Link>
        </Nav>
      </div>

      <div id='brand2' className='container'>
        <Button variant="outline-light" onClick={handleOpen}> <Wallet /> </Button>&nbsp;&nbsp;
        <ConnectWallet
          open={open}
          onClose={handleClose}
          onLogin={props.onLogin}
          onLogout={props.onLogout}
          connectMeta={(e) => props.connectMeta(e)}
        />
        <Button variant='outline-light'> <ShoppingCart /> </Button>
      </div>
    </Navbar>
  );
}

export default JasmyNavbar;