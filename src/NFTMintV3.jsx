import { Alert } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import './NFTMintv2.css'
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import { imageDb, database } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid';
import Web3 from 'web3';
import { Context } from './connectWallet';
import { abi } from './ABI.js';
import { create } from 'ipfs-http-client';

const NFTMintv3 = ({ isLog }) => {

    const ctx = useContext(Context);

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_HOST));
    let loading = false;

    const [uploadedFiles, setUploadedFiles] = useState([]);
    // const [tokenUri, setTokenUri] = useState("");

    // console.log("Wallet from context ", ctx.wallet.accounts[0]);

    const contract = new web3.eth.Contract(abi, contractAddress);
    if (ctx.wallet.accounts[0] !== undefined) {
        contract.methods.getAvailableMintsForUser(ctx.wallet.accounts[0]).call()
            .then((v) => console.log("getAvailableMintsForUser ", v))
            .catch((e) => console.error(e))
    }

    // contract.methods.getUriList().call()
    // .then((v)=>console.log("Uri List",v))

    const ipfsClient = async (data) => {
        const ipfs = await create({
            host: "127.0.0.1",
            port: 5001,
            protocol: "http",
            apiPath: "/api/v0"
        });

        const result = await ipfs.add({
            content: data
        });
        return result;
    }

    const startMint = async (tokenURI) => {
        // const startMint = async () => {

        // console.log("TokenId inside startMint function ", tokenId)
        console.log(ctx.wallet.accounts[0]);

        const uriList = await contract.methods.getUriList().call();
        const mintFunction = await contract.methods._safeMint(ctx.wallet.accounts[0], uriList.length+1 , tokenURI);
        const encodedABI = mintFunction.encodeABI();
        ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: ctx.wallet.accounts[0],
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

        // let a = fabricmask.transfer({
        //     channelName : 'jasmy-nft-dev',
        //     chaincodeId : 'gp-nft',
        //     functionName : 'mintWithTokenURI',
        //     functionArgs : ["270", "https://d2qqa3aq0n81o.cloudfront.net/meta/sample.json"]
        // })
        // let a = fabricmask.transfer({
        //     channelName: 'jasmy-nft-dev',
        //     chaincodeId: 'gp-nft',
        //     functionName: 'balanceOf',
        //     functionArgs: ["0xcced13aefc86f5558f6d1d88c594bb9280121019"]
        // }, function(res){console.log("Checking response ",res)})

        // console.log("checking response type ", a);

    }

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
            delete acceptedFiles.path;
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
                    saveImageUrl(url);
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
            clearSelect();
            console.log(currentToken)
            console.log(tokenUri)

        }).catch((error) => {
            console.log("Error updating data: ", error)
        })


    }

    const saveToFirebase = async (event) => {

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

    const uploadImage = async ()=>{
        try {
            if (uploadedFiles.length != 0) {
                // const imgRef = ref(imageDb, `property/${v4()}`)

                // const imgUpload = await uploadBytes(imgRef, uploadedFiles[0])

                // console.log(uploadedFiles[0].path);
                // delete uploadedFiles[0].path;
                
                const result = await ipfsClient(uploadedFiles[0]);
                console.log(result);

                if(result){
                    const imageCID = `https://ipfs.io/ipfs/${result.path}`;
                    uploadMetaData(imageCID);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uploadMetaData = async (imageCID) => {
        try{
            const { image, name, externalLink, description, supply, blockchain, price } = metadata;
            const finalData = {
                image : imageCID,
                name : name,
                externalLink : externalLink,
                description : description,
                supply : supply,
                blockchain : blockchain,
                price : price
            }

            const result2 = await ipfsClient(JSON.stringify(finalData));
            startMint(`https://ipfs.io/ipfs/${result2.path}`);
            clearSelect();
        }
        catch(error){
            console.error(error);
        }
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

            {/* <h5 style={{ marginTop: '25pt' }}>Supply</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The number of items that can be minted. No gas cost to you!
            </p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control defaultValue={1} type='number' name="supply" value={metadata.supply} onChange={postUri} />
                </Form.Group>
            </Form> */}

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
                <Button onClick={uploadImage}>Create</Button>
                // <Button onClick={startMint}>Create</Button>
            ) : (
                <>
                    <Alert severity='warning'>
                        Your wallet is not connected. Please connect your wallet to proceed.
                    </Alert>

                </>

            )}


        </div>

    )
}

export default NFTMintv3;