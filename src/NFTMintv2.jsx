import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './NFTMintv2.css'
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import ReactSelect from 'react-select';
import arbitrum from './assets/Blockchains/arbitrum.svg'
import { imageDb, database } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { set, ref as databaseRef, onValue, child, get, push } from "firebase/database"
import { v4 } from 'uuid';
import Web3 from 'web3';


const NFTMintv2 = ({ isLog, meta }) => {


    let loading = false;
    const contractAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc";
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_fromTokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_toTokenId",
                    "type": "uint256"
                }
            ],
            "name": "BatchMetadataUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "MetadataUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_uri",
                    "type": "string"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const startMint = async (tokenId, tokenURI) => {

        const mintFunction = contract.methods.mint(meta.accounts[0], tokenId, tokenURI);
        const encodedABI = mintFunction.encodeABI();
        ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: meta.accounts[0],
                to: contractAddress,
                data: encodedABI
            },
            ],
        })
            .then((err, txHash) => {
                if (!err) {
                    console.log(txHash);
                }
                else {

                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const contract = new web3.eth.Contract(abi, contractAddress);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    //const [tokenUri, setTokenUri] = useState("");

    const [metadata, setMetadata] = useState({
        image: "",
        name: "",
        externalLink: "",
        description: "",
        supply: 1,
        blockchain: "",
        price: 0
    })
    const [currentToken, setCurrentToken] = useState(0);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
        },
    });
    const clearSelect = () => {
        setUploadedFiles([]);
        setMetadata({
            image: "",
            name: "",
            externalLink: "",
            description: "",
            supply: 1,
            blockchain: "",
            price: 0
        })
    }

    const saveData = async () => {
        try {
            if (uploadedFiles.length != 0) {
                const imgRef = ref(imageDb, `property/${v4()}`)

                const imgUpload = await uploadBytes(imgRef, uploadedFiles[0])

                if (imgUpload) {
                    let url = await getDownloadURL(imgRef);
                    saveImageUrl(url)
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveImageUrl = async (image) => {
        let objectIndex = "";
        let tokenUri = "";
        let tokenId = 0;

        await fetch("https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json")
            .then((res) => res.json())
            .then((data) => {
                const keys = Object.keys(data);
                setCurrentToken(keys.length);
                tokenId = keys.length;
                objectIndex = keys[keys.length - 1];
            })
            .catch((error) => console.log(error))

        //setTokenUri("https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata/" + objectIndex + ".json")
        tokenUri = "https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata/" + objectIndex + ".json?print=pretty";
        const { name, externalLink, description, supply, blockchain, price } = metadata;
        let update = await fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata/${objectIndex}.json`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image,
                    name,
                    externalLink,
                    description,
                    supply,
                    blockchain,
                    price
                })
            }
        ).then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }
            return res.json();
        }).then((updatedData) => {
            console.log("Data updated: ", updatedData)
            startMint(tokenId, tokenUri)
            loading=false;
            clearSelect();
            console.log(currentToken)
            console.log(tokenUri)

        }).catch((error) => {
            console.log("Error updating data: ", error)
        })


    }

    const saveToFirebase = async (event) => {

        loading=true;
        const { image, name, externalLink, description, supply, blockchain, price } = metadata;

        const res = await fetch(
            "https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image,
                    name,
                    externalLink,
                    description,
                    supply,
                    blockchain,
                    price
                })
            }
        );

        if (res) {
            console.log("Data Stored")
            saveData();
        }
        else {
            console.log("Something Wrong")
        }
    }

    const getToken = () => {
        console.log("First Method")
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
            // return 90

            if (snapshot.exists()) {
                tempToken = snapshot.val();
                setCurrentToken(tempToken);
                console.log("State token ", currentToken)
                console.log("Temp token ", tempToken);
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
        }).then(() => {
            saveData();
        })
            .catch((error) => {
                console.log(error);
            });

    }

    let name, value;
    const postUri = (event) => {
        name = event.target.name;
        value = event.target.value;

        setMetadata({ ...metadata, [name]: value })
    }


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
            {isLog ? (
                <Button onClick={saveToFirebase}>Create</Button>
            ) : (
                <>
                    <Alert severity='warning'>
                        Your wallet is not connected. Please connect your wallet to proceed.
                    </Alert>

                </>

            )}

            {/* <Button onClick={saveImageUrl}>Update</Button>&nbsp;&nbsp;
            <Button onClick={saveData}>Upload</Button> */}

        </div>

    )
}

export default NFTMintv2;