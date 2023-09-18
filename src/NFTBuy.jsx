import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import nft from './assets/nft-image-2.png';
import './NFTBuy.css';
import Button from 'react-bootstrap/Button';
import { Card, Col, ListGroup, Row, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FavoriteBorder, OpenInFull, Schedule, VideogameAsset, Visibility } from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';
import eth from './assets/ethereum-svgrepo-com (1).svg'

function NFTBuyPage() {
  const { value } = useParams();
  const renderTooltip = (id, title, children) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  const [openImageModal, setOpenImageModal] = useState(false);

  const handleImageClick = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  return (
    <>
      <div id='buyer' className='container'>
        <div className="side">
        <div className='image-frame'>
          <div className='bar'>
            <div style={{marginLeft : '5pt'}}> <Image src={eth} style={{width : '18px'}} /> </div>
            <div style={{marginRight : '5pt'}}>
              <OpenInFull style={{width : '19px'}}/>&nbsp;&nbsp;
              <span style={{fontSize : '10pt'}}>9</span> <FavoriteBorder style={{width : '20px'}}/>
              </div>
            
          </div>
          <div style={{maxWidth : '100%', minWidth : '10%', maxHeight : '100%', minHeight : '10%'}}>
          <Image
            src={nft}
            onClick={handleImageClick}
          />
          </div>
          </div>
          <Accordion className='mt-3 mb-3' defaultActiveKey="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                A Playable Champion in Champions Arena. Each Champion has unique skills and strengths in combat and exploration.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col >Contract Address</Col>
                  <Col >
                    {renderTooltip('wallet', '0xc21798ae3eFeD61563A29a0BE88C79Df7Ca07Fa9',
                      <span>
                        0xc21798a......9Df7Ca07Fa9
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
          <div style={{width : '100%'}}>
            <h1>
              Bored Fox #{value}
            </h1>
            <strong>Owned By </strong> Zawad
            <br />
            <br />

            <Visibility /> 101 Views &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FavoriteBorder /> 76 Favorites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <VideogameAsset /> Gaming
            <br />
            <br />
            <ListGroup style={{width : '88%', borderRadius: '15px'}}>
              <ListGroup.Item style={{padding : '20px'}}>
                
                  <Schedule />&nbsp;&nbsp; Sale ends 27th October, 2023 at 7:55 AM
                
              </ListGroup.Item>
              <ListGroup.Item >
                <p className='mt-3 mb-0' style={{ color: 'GrayText' }}>Current Price</p>
                <h2>
                  0.01 ETH &nbsp;
                  <span style={{ color: 'GrayText', fontSize: '15pt' }}>$322.09</span>
                </h2>

                <div className='mb-2 mt-3' style={{width : '100%'}}>
                  <Button variant='primary' className='custom-button'> Buy Now</Button>&nbsp; &nbsp;
                  <Button variant='secondary' className='custom-button'> Add to Cart</Button>

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
            src={nft}
            width="100%"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NFTBuyPage;
