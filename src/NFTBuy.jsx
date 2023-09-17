import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import nft from './assets/nft-image-2.png';
import './NFTBuy.css';
import Button from 'react-bootstrap/Button';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FavoriteBorder, Schedule, VideogameAsset, Visibility } from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';

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
      <div className='container'>
        <div className="side">
          <Image
            src={nft}
            width="90%"
            className='image-frame'
            onClick={handleImageClick}
          />
          <Card style={{ height: '275px', width: '600px' }} className='mt-3 mb-3'>
                <Card.Body>
                  <Tabs
                    defaultActiveKey="description"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                  >
                    <Tab eventKey="description" title="Description">
                      A Playable Champion in Champions Arena. Each Champion has unique skills and strengths in combat and exploration.
                    </Tab>
                    <Tab eventKey="details" title="Details">
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
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
        </div>
        <div className="side side-content-center">
          <div>
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
            <ListGroup>
              <ListGroup.Item>
                <strong>
                  <Schedule/>&nbsp;&nbsp; Sale ends in 27th October 2023
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <p className='mt-1' style={{ color: 'GrayText' }}>Current Price</p>
                <h2>
                  0.01 ETH &nbsp;
                  <span style={{ color: 'GrayText', fontSize: '15pt' }}>$322.09</span>
                </h2>

                <div className='mb-2'>
                  <Button variant='primary' className='custom-button'> Buy Now</Button>&nbsp; &nbsp;
                  <Button variant='secondary' className='custom-button'> Add to Cart</Button>

                </div>
              </ListGroup.Item>
            </ListGroup>
            <div className='mt-3'>
              
            </div>
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
