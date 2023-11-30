import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, InputGroup } from 'react-bootstrap';
import ConnectWallet from './connectWallet';
import { useState, useContext } from 'react';
import { Wallet } from '@mui/icons-material';
import './navbar.css'
import fabricmask from './assets/favicon.png'
import Form from 'react-bootstrap/Form';
import PersonIcon from '@mui/icons-material/Person';
import { Context } from './connectWallet';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: '6pt',
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: '#7d7d7d'
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'white',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

function JasmyNavbar(props) {
  const ctx = useContext(Context);
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
  console.log("Checking balance ", ctx?.wallet?.ethFormat);

  return (
    <Navbar bg="dark" data-bs-theme="dark" >
      <div id='brand' className='container'>
        <Navbar.Brand href="/" style={{ fontSize: '17pt', fontWeight: 'bold' }}>
          <img src={fabricmask}
            width="39" height="38"
            className='d-inline-block align-top'
          />&nbsp;&nbsp;
          Jasmy Market Place
          
        </Navbar.Brand>
        <div style={{
          borderLeft: '1pt solid #7d7d7d',
          height: '30pt',
          marginLeft: '4pt',
          marginRight: '9pt'
        }}>
        </div>

        <Nav className='me-auto'>
          {/* <Nav.Link onClick={handleMintOpen}>Mint</Nav.Link>
          <NFTMint mint={mint} onClose={handleMintClose} 
            isLog={props.isLog}
            meta={props.meta}
          /> */}
          <Nav.Link href='/mint2'
            style={{
              color: 'white',
              fontSize: '12pt',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
            Mint
          </Nav.Link>

        </Nav>
      </div>

      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search> */}

      <InputGroup id='whole'>
        <div
          style={{
            backgroundColor: '#3a3a3a',
            color: 'white',
            padding: '5pt',
            borderTopLeftRadius: '5pt',
            borderBottomLeftRadius: '5pt'
          }}
          
          >
          <SearchIcon />
        </div>

        <Form.Control
          type="search"
          placeholder="Search"
          id='searchbar'
          aria-label="Search"
        />

      </InputGroup>

      <div id='brand2' className='container'>
        <Button id='button' onClick={handleOpen}>
          <Wallet />&nbsp;&nbsp;&nbsp;
          {props.isLog ? (
            <span>{Math.floor(ctx?.wallet?.ethFormat)} DD</span>
          ) : (
            <span>Connect</span>
          )}
        </Button>&nbsp;&nbsp;
        <ConnectWallet
          open={open}
          onClose={handleClose}
          onLogin={props.onLogin}
          onLogout={props.onLogout}
          connectMeta={(e) => props.connectMeta(e)}
        />
        {/* <Button variant='outline-light'> <ShoppingCart /> </Button>&nbsp;&nbsp; */}
        {/* <Nav.Link style={{ color: 'white' }} href='/myprofile'>Profile</Nav.Link> */}
        <Button id='button' href='/myprofile'><PersonIcon /></Button>

      </div>
    </Navbar>
  );
}

export default JasmyNavbar;