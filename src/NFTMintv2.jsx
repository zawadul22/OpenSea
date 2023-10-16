import { Accordion, AccordionSummary, Typography, Menu, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './NFTMintv2.css'
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { StarBorder, BarChart, LockOpen, Warning, PreviewSharp } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddItemIcon from './AddItem'
import ToggleSlider from './Switch';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import ReactSelect from 'react-select';
import arbitrum from './assets/Blockchains/arbitrum.svg'
import { imageDb, database } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { set, ref as databaseRef, onValue, child, get } from "firebase/database"
import { v4 } from 'uuid';

const NFTMintv2 = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [metadata, setMetadata] = useState({
        image: "",
        name: "",
        externalLink: "",
        description: "",
        supply: 1,
        blockchain: "",
        price: 0
    })
    const [currentToken, setCurrentToken] = useState(1)

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
        },
    });
    const clearSelect = () => {
        setUploadedFiles([]);
    }



    const saveData = () => {
        try {
            if (uploadedFiles.length != 0) {
                const imgRef = ref(imageDb, `property/${v4()}`)
                console.log(imgRef)
                uploadBytes(imgRef, uploadedFiles[0]).then(() => {
                    getDownloadURL(imgRef).then((url) => {
                        setMetadata((prevState) => {
                            //prevState.image = url
                            console.log(prevState)
                            return { ...prevState, image: url }
                        })
                        console.log(url)
                        console.log(metadata.image)
                        saveToFirebase();
                    })
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const saveToFirebase = () => {
        const metadataRef = databaseRef(database, `metadata/` + token);
        set(metadataRef, {
            image: metadata.image,
            name: metadata.name,
            externalLink: metadata.externalLink,
            description: metadata.description,
            supply: metadata.supply,
            blockchain: metadata.blockchain,
            price: metadata.price
        })

    }

    const getToken = () => {
        const tokenRef = databaseRef(database);
        let tempToken;
        // onValue(tokenRef, (snapshot) => {
        //     tempToken = snapshot.val();
        //     // console.log("Before setting into state ", tempToken);
        //     setCurrentToken(tempToken)
        //     console.log("Current token : " + currentToken)
        //     console.log("Temp Token : " + tempToken);

        // })

        get(child(tokenRef, `token/`)).then((snapshot) => {
            if (snapshot.exists()) {
                tempToken = snapshot.val();
                setCurrentToken(tempToken);
                console.log("State token ", currentToken)
                console.log("Temp token ",tempToken);
                tempToken += 1;
                set(databaseRef(database), {
                    token: tempToken
                }).then(() => {
                    console.log("Token Set")
                })
            }
            else {
                console.log("No value found")
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log("Current token out of onValue ", currentToken);
        // tempToken += 1;
        // set(databaseRef(database), {
        //     token: tempToken
        // }).then(() => {
        //     console.log("Token Set")
        // })
        //saveData();

    }

    
    //console.log(uri);

    let name, value;
    const postUri = (event) => {
        name = event.target.name;
        value = event.target.value;

        setMetadata({ ...metadata, [name]: value })
    }

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
            <Form >
                <Form.Group className='mt-3 mb-3' controlId='name'>
                    <Form.Control type='text' placeholder='Item Name' name='name' value={metadata.name} onChange={postUri} />
                </Form.Group>
            </Form>


            <h5 style={{ marginTop: '25pt' }}>External Link</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                You can include a link to this URL on this item's detail page,
                so that users can click to learn more about it.
            </p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control type='text' placeholder='https://yoursite.io/item/123' name='externalLink' value={metadata.externalLink} onChange={postUri} />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '20pt' }}>Description</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The description will be included on the item's detail page underneath its image.
            </p>
            <Form>
                <Form.Group className='mt-3 mb-3' >
                    <Form.Control as="textarea" rows={4} placeholder='Provide a detailed description of your item' name="description" value={metadata.description} onChange={postUri} />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '25pt' }}>Supply</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The number of items that can be minted. No gas cost to you!
            </p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control defaultValue={1} type='number' name="supply" value={metadata.supply} onChange={postUri} />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '25pt' }}>Blockchain</h5>

            <Form.Select aria-label="Blockchain Options" defaultValue={"Ethereum"} className='mb-4' name="blockchain" value={metadata.blockchain} onChange={postUri}>
                <option>Select a network</option>
                <option value="Arbitrum">Arbitrum</option>
                <option value="Arbitrum Nova">Arbitrum Nova</option>
                <option value="Avalanche">Avalanche</option>
                <option value="Base">Base</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Klaytn">Klaytn</option>
                <option value="Optimism">Optimism</option>
                <option value="Polygon">Polygon</option>
                <option value="Zora">Zora</option>

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
            <h5 style={{ marginTop: '25pt' }}>Price</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                Put your asking price according to the blockchain you've selected.
            </p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control type='number' placeholder='' name="price" value={metadata.price} onChange={postUri} />
                </Form.Group>
            </Form>

            <Button >Create</Button>&nbsp;&nbsp;
            <Button>Download</Button>

        </div>

    )
}

export default NFTMintv2;