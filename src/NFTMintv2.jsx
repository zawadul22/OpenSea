import { Accordion, AccordionSummary, Typography, Menu, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './NFTMintv2.css'
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { StarBorder, BarChart, LockOpen, Warning } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddItemIcon from './AddItem'
import ToggleSlider from './Switch';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import ReactSelect from 'react-select';
import arbitrum from './assets/Blockchains/arbitrum.svg'

const NFTMintv2 = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
        },
    });
    const clearSelect = () => {
        setUploadedFiles([]);
    }

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

    const blockchains = [
        { value: 'arbitrum', label: 'Arbitrum', image: arbitrum },
        { value: 'arbitrumNova', label: 'Arbitrum Nova', image: './assets/Blockchains/Arbitrum-Nova.svg' }
    ]


    return (

        <div className='mintContainer'>
            <h1 style={{ marginBottom: '30px' }}> Create New Item</h1>
            <div style={{ fontSize: '10pt', color: '#5b5b5b' }}> <span style={{ color: 'red' }}>*</span> Required fields</div>
            <strong>Image, Video, Audio, or 3D Model </strong>
            <div style={{ fontSize: '10.5pt', color: '#707070', marginTop: '3pt' }}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </div>

            <div {...getRootProps()} className='image-drop'>

                {uploadedFiles.length === 0 ? (
                    <>
                        <input {...getInputProps()} />
                        <ImageIcon style={{ color: '#9c9c9c' }} />
                    </>
                ) : (
                    // <ul>
                    //     {uploadedFiles.map((file) => (
                    //         <li key={file.name}>{file.name}</li>
                    //     ))}
                    // </ul>
                    <>
                        {uploadedFiles.map((file) => (
                            <>
                                {file.name}&nbsp;&nbsp;
                                <button style={{ border: '0px' }} onClick={clearSelect}>×</button>
                            </>
                        ))}
                    </>
                )}
            </div>

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
            {/* <Accordion id='collection' onClick={handleClick}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <text style={{ color: 'GrayText' }}>Select Collection</text>
                </AccordionSummary>
            </Accordion> */}
            <Form.Select aria-label='Select your collection' placeholder='Select Your Collection' className='mb-4'>
                <option>Select Your Collection</option>
            </Form.Select>
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

            {/* {traits.map((item, index) => (
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
            ))} */}
            <h5 style={{ marginTop: '25pt' }}>Supply</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The number of items that can be minted. No gas cost to you!
            </p>
            <Form>
                <Form.Group className="mb-3" controlId='controlSupply'>
                    <Form.Control defaultValue={1} />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '25pt' }}>Blockchain</h5>
            {/* <Networks /> */}
            {/* <Networks2 /> */}
            <Form.Select aria-label="Blockchain Options" defaultValue={5} className='mb-4'>

                <option value="1">Arbitrum</option>
                <option value="2">Arbitrum Nova</option>
                <option value="3">Avalanche</option>
                <option value="4">Base</option>
                <option value="5">Ethereum</option>
                <option value="6">Klaytn</option>
                <option value="7">Optimism</option>
                <option value="8">Polygon</option>
                <option value="9">Zora</option>

            </Form.Select>

            {/* <ReactSelect
                className='mb-4'
                value={blockchains.value}
                options={blockchains}
                formatOptionLabel={blockcahin => (
                    <div className='blockchain'>
                        <img src={blockcahin.image} alt='' />&nbsp;
                        <span>{blockcahin.label}</span>
                    </div>
                )}

            /> */}

            <Button>Create</Button>

        </div>

    )
}

export default NFTMintv2;