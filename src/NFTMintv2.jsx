import { Accordion, AccordionSummary, Typography, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './NFTMintv2.css'
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { StarBorder, BarChart, LockOpen, Warning } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddItemIcon from './AddItem'
import ToggleSlider from './Switch';

const NFTMintv2 = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const traits = [
        {
            icon1: <FormatListBulletedIcon />,
            title: "Properties",
            description: "Textual traits that show up as rectangles",
            icon2: "add"
        },
        {
            icon1: <StarBorder />,
            title: "Level",
            description: "Numerical traits that show as a progress bar",
            icon2: "add"
        },
        {
            icon1: <BarChart />,
            title: "Stats",
            description: "Numerical traits that just show as numbers",
            icon2: "add"
        },
        {
            icon1: <LockOpen style={{ color: '#6c35ff' }} />,
            title: "Unlockable Content",
            description: "Include unlockable content that can only be revealed by the owner of the item.",
            icon2: "switch"
        },
        {
            icon1: <Warning />,
            title: "Explicit & Sensitive Content",
            description: "Set this item as explicit and sensitive content",
            icon2: "switch"
        }
    ];

    return (

        <div className='mintContainer'>
            <h1 style={{ marginBottom: '30px' }}> Create New Item</h1>
            <div style={{ fontSize: '10pt', color: '#5b5b5b' }}> <span style={{ color: 'red' }}>*</span> Required fields</div>
            <strong>Image, Video, Audio, or 3D Model </strong>
            <div style={{ fontSize: '10.5pt', color: '#707070', marginTop: '3pt' }}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </div>
            <div>Image Drop</div>
            <h5 style={{ marginTop: '20pt' }}>Name *</h5>
            <Form>
                <Form.Group className='mt-3 mb-3' controlId='controlName'>
                    <Form.Control type='text' placeholder='Item Name' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '25pt' }}>External Link</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                OpenSea will include a link to this URL on this item's detail page,
                so that users can click to learn more about it.
                You are welcome to link to your own webpage with more details.
            </p>
            <Form>
                <Form.Group className="mb-3" controlId='controlName'>
                    <Form.Control type='text' placeholder='https://yoursite.io/item/123' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '20pt' }}>Description</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The description will be included on the item's detail page underneath its image. Markdown syntax is supported.
            </p>
            <Form>
                <Form.Group className='mt-3 mb-3' controlId='controlName'>
                    <Form.Control as="textarea" rows={4} placeholder='Provide a detailed description of your item' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '20pt' }}>Collection</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                This is the collection where your item will appear.
            </p>
            <Accordion id='collection' onClick={handleClick}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <text style={{ color: 'GrayText' }}>Select Collection</text>
                </AccordionSummary>
            </Accordion>
            {/* <Form.Select aria-label='Select your collection'>
                <option>Select Your Collection</option>
            </Form.Select> */}
            {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Dropdown Item 1</MenuItem>
                <MenuItem onClick={handleClose}>Dropdown Item 2</MenuItem>
                <MenuItem onClick={handleClose}>Dropdown Item 3</MenuItem>
            </Menu> */}

            {/* <InputGroup className="mb-3" id='collection2'>
                <Form.Control aria-label="Text input with dropdown button" placeholder='Select collection'/>

                <DropdownButton
                     variant="outline"
                    id="input-group-dropdown-2"
                    align="end"
                    
                >
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </DropdownButton>
            </InputGroup> */}

            {traits.map((item, index) => (
                <div key={index} style={{ marginTop: '10pt', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>

                        <span style={{ marginRight: '10pt' }}>
                            {item.icon1}
                        </span>

                        <span>
                            <strong>{item.title}</strong><br />
                            {item.description}
                        </span>
                        {item.icon2 === "add" && (
                            <span style={{ position: 'absolute', right: '45%' }}>
                                <AddItemIcon />
                            </span>
                        )}
                        {item.icon2 === "switch" && (
                            <span style={{ position: 'absolute', right: '45%', paddingTop: '10pt' }}>
                                <ToggleSlider id={`toggle-switch-${index}`} />
                            </span>
                        )}
                    </div>
                    <hr />
                </div>
            ))}
            <h5 style={{ marginTop: '25pt' }}>Supply</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
            The number of items that can be minted. No gas cost to you!
            </p>
            <Form>
                <Form.Group className="mb-3" controlId='controlSupply'>
                    <Form.Control  />
                </Form.Group>
            </Form>

        </div>

    )
}

export default NFTMintv2;