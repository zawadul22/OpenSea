import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './NFTBuy.css';
import Image from 'react-bootstrap/Image';
import { Col, ListGroup, Row, Accordion } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FavoriteBorder, OpenInFull, Schedule, VideogameAsset, Visibility } from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';
import eth from './assets/ethereum-svgrepo-com (1).svg'

const View = () => {
    const { value } = useParams();
    const [obj, setObj] = useState([]);

    const [openImageModal, setOpenImageModal] = useState(false);

    const handleImageClick = () => {
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setOpenImageModal(false);
    };

    const renderTooltip = (id, title, children) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );


    useEffect(() => {
        fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
            .then((res) => res.json())
            .then((data) => {
                let temp = Object.values(data)
                setObj(temp);
            })
    }, [])

    console.log(obj)

    return (
        <>
            <center style={{ padding: '10pt' }}><h2>Your NFT</h2></center>
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
                        <div style={{ maxWidth: '100%', minWidth: '10%', maxHeight: '100%', minHeight: '10%' }}>
                            <Image
                                src={obj[value - 1] ? obj[value - 1].image : null}
                                style={{ display: 'flex', height: '100%', width: '100%' }}
                                onClick={handleImageClick}
                            />
                        </div>
                    </div>
                    <Accordion className='mt-3 mb-3' defaultActiveKey="0">
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Description</Accordion.Header>
                            <Accordion.Body>
                                {obj[value - 1] ? obj[value - 1].description : null}
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
                                                0x2c097A.....eF9829
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
                            {obj[value - 1] ? obj[value - 1].name : null} #{value}
                        </h1>
                        <br />
                        <br />

                        <Visibility /> 101 Views &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FavoriteBorder /> 76 Favorites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <VideogameAsset /> Gaming
                        <br />
                        <br />
                        <ListGroup style={{ width: '88%', borderRadius: '15px' }}>
                            <ListGroup.Item style={{ padding: '20px' }}>

                                <Schedule />&nbsp;&nbsp; Sale ends 27th October, 2023 at 7:55 AM

                            </ListGroup.Item>
                            <ListGroup.Item >
                                <p className='mt-3 mb-0' style={{ color: 'GrayText' }}>Current Price</p>
                                <h2>
                                    {obj[value - 1] ? obj[value - 1].price : null} JASMY &nbsp;
                                    <span style={{ color: 'GrayText', fontSize: '15pt' }}>${obj[value - 1] ? obj[value - 1].price * 60 : null}</span>
                                </h2>

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
                        src={obj[value - 1] ? obj[value - 1].image : null}
                        width="100%"
                        style={{ maxHeight: '80vh', objectFit: 'contain' }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default View;