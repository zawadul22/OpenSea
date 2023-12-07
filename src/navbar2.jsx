import { Button, Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import ConnectWallet, { Context } from "./connectWallet";
import { useContext, useState } from "react";
import fabricmask from './assets/favicon.png';
import './navbar2.css';
import { Wallet } from '@mui/icons-material';


const JasmyNavbar2 = (props) => {

    const ctx = useContext(Context);
    const [open, setOpen] = useState(false);
    const [mint, setMint] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (

        <Navbar id="nav-container2" bg='dark' data-bs-theme="dark" expand='md' >
            <Navbar.Brand id="brand2" href="/">
                <img width="30" src={fabricmask} />&nbsp;
                Jasmy Market Place
            </Navbar.Brand>
            <div style={{ display: 'flex', gap: '6pt' }} >

                <Button id='button' onClick={handleOpen}>
                    <Wallet />&nbsp;
                    {props.isLog ? (
                        <span>{Math.floor(ctx?.wallet?.ethFormat)} DD</span>
                    ) : (
                        <span>Connect</span>
                    )}
                </Button>
                <ConnectWallet
                    open={open}
                    onClose={handleClose}
                    onLogin={props.onLogin}
                    onLogout={props.onLogout}
                    connectMeta={(e) => props.connectMeta(e)}
                />
                <Navbar.Toggle aria-label="offcanvas-navbar" />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Nav className='me-auto'>
                            <Form className="d-flex mb-3">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav.Link href='/mint2'>
                                Mint
                            </Nav.Link>
                            <Nav.Link href='/myprofile'>
                                Profile
                            </Nav.Link>
                        </Nav>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </Navbar>

    )
}

export default JasmyNavbar2;