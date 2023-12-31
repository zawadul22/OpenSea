import React, { useEffect, useState, useContext } from 'react';
import Image from 'react-bootstrap/Image';
import './NFTBuy.css';
import Button from 'react-bootstrap/Button';
import { Card, Col, ListGroup, Row, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FavoriteBorder, OpenInFull, Schedule, VideogameAsset, Visibility } from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';
import eth from './assets/ethereum-svgrepo-com (1).svg'
import { Context } from './connectWallet';
import Web3 from 'web3';
import { abi } from './ABI';


function NFTBuyPage() {
    const { value } = useParams();
    const renderTooltip = (id, title, children) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
    const ctx = useContext(Context);

    const [openImageModal, setOpenImageModal] = useState(false);
    const [owner, setOwner] = useState("");

    const handleImageClick = () => {
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setOpenImageModal(false);
    };

    const [obj, setObj] = useState([]);
    const [uriList, setUriList] = useState([]);

    // useEffect(() => {

    //     fetch("https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json")
    //         .then((response) => response.json())
    //         .then((data) => {

    //             setObj(Object.values(data))


    //         })


    // }, [])

    const shortForm = {
        "Arbitrum": 'ARB',
        "Arbitrum Nova": 'ARBN',
        "Avalanche": 'AVL',
        "Base": 'B',
        "Ethereum": 'ETH',
        "Klaytn": 'KLT',
        "Optimism": 'OPT',
        "Polygon": 'PLG',
        "Zora": 'Z'
    }

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_HOST));
    const contract = new web3.eth.Contract(abi, contractAddress);

    console.log("Account ", ctx?.wallet?.accounts[0]);

    useEffect(() => {
        contract.methods.ownerOf(value).call()
            .then((v) => {
                console.log("Owner address ", v);
                setOwner(v);
                console.log(v);
            })
            .catch((e) => console.error(e));

        contract.methods.getUriList().call()
            .then((v) => {
                setUriList(v)
            })
            .catch((error) => {
                console.error(error)
            })

    }, [])


    useEffect(() => {
        // console.log(uriList)
        
        Promise.all(uriList.map((url) =>
            fetch(url).then((res) => res.json())))
            .then((data) => {
                console.log(" response data", data);
                setObj(data);
            })
            .catch((error) => console.error(error));


    }, [uriList])

    console.log("Object state ", obj)

    const buyNFT = () => {

        if (localStorage.getItem("Connected") === "false") {
            alert("Your wallet is not connected")
        }
        else if (localStorage.getItem("Connected") === "true") {

            if (owner.toLowerCase() === ctx?.wallet?.accounts[0]) {
                alert("You are the owner of this NFT!")
            }
            else {
                // if (obj[value - 1].price > ctx.wallet.ethFormat) {
                //     alert("You don't have sufficient balance!")
                // }
                // else {
                const nftTransferMethod = contract.methods.safeTransferFrom(owner, ctx?.wallet?.accounts[0], value);
                const encodedABI = nftTransferMethod.encodeABI();
                ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: owner,
                        to: contractAddress,
                        data: encodedABI
                    },
                    ],
                })

                // }
            }
        }
    }

    return (
        <>
            <div id='buyer' className='container'>
                <div className="side">
                    <div className='image-frame'>
                        <div className='bar'>
                            <div style={{ marginLeft: '5pt' }}> <Image src={eth} style={{ width: '18px' }} /> </div>
                            <div style={{ marginRight: '5pt' }}>
                                <OpenInFull style={{ width: '19px' }} />&nbsp;&nbsp;
                                <span style={{ fontSize: '10pt' }}>9</span> <FavoriteBorder style={{ width: '20px' }} />
                            </div>

                        </div>
                        <div className='nft-buy-img-container' >
                            <Image
                                src={obj[value-1] ? obj[value-1].image : null}
                                style={{ height: '100%', width: '100%' }}
                                className='nft-img'
                                onClick={handleImageClick}
                            />
                        </div>
                    </div>
                    <Accordion className='mt-3 mb-3' defaultActiveKey="0">
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Description</Accordion.Header>
                            <Accordion.Body>
                                {obj[value-1] ? obj[value-1].description : null}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>Details</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col >Contract Address</Col>
                                    <Col >
                                        {renderTooltip('wallet', '0x2c097A15A70FFe623B13041d8aB4bb1BdaeF9829',
                                            <span>
                                                0x2c097A15A7bb1BdaeF9829
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >Token ID</Col>
                                    <Col >{value}</Col>
                                </Row>
                                <Row>
                                    <Col>Token Standard</Col>
                                    <Col>ERC 721</Col>
                                </Row>
                                <Row>
                                    <Col>Chain</Col>
                                    <Col>Ethereum</Col>
                                </Row>
                                <Row>
                                    <Col>Last Updated</Col>
                                    <Col>1 day ago</Col>
                                </Row>
                                <Row>
                                    <Col>Creator Earnings</Col>
                                    <Col>10%</Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
                <div className="side-content-center">
                    <div style={{ width: '100%' }}>
                        <h1>
                            {obj[value-1] ? obj[value-1].name : null} #{value}
                            {/* Wintos #{value} */}

                        </h1>
                        <strong>Owned By </strong>&nbsp; {owner}
                        <br />
                        <br />

                        <Visibility /> 101 Views &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FavoriteBorder /> 76 Favorites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <VideogameAsset /> Gaming
                        <br />
                        <br />
                        <ListGroup className='list-group'>
                            <ListGroup.Item style={{ padding: '20px' }}>

                                <Schedule />&nbsp;&nbsp; Sale ends 27th October, 2023 at 7:55 AM

                            </ListGroup.Item>
                            <ListGroup.Item >
                                <p className='mt-3 mb-0' style={{ color: 'GrayText' }}>Current Price</p>
                                <h2>
                                    {obj[value-1] ? obj[value-1].price : null} DD Coin &nbsp;
                                    <span style={{ color: 'GrayText', fontSize: '15pt' }}>${obj[value-1] ? obj[value-1].price * 60 : null}</span>
                                </h2>

                                <div className='mb-2 mt-3' style={{ width: '100%' }}>
                                    <Button variant='primary' id='custom-button' onClick={buyNFT}> Buy Now</Button>&nbsp; &nbsp;
                                    <Button variant='secondary' id='custom-button'> Add to Cart</Button>

                                </div>
                            </ListGroup.Item>
                        </ListGroup>

                    </div>
                </div>
            </div>

            <Dialog
                open={openImageModal}
                onClose={handleCloseImageModal}
                maxWidth="lg"
            >
                <DialogContent onClick={handleCloseImageModal}>
                    <Image
                        src={obj[value-1] ? obj[value-1].image : null}
                        width="100%"
                        style={{ maxHeight: '80vh', objectFit: 'contain' }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default NFTBuyPage;
