import React, { useEffect, useState } from 'react';
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

  const [obj , setObj] = useState([]);

  const shortForm = {
    "Arbitrum" : 'ARB',
    "Arbitrum Nova" : 'ARBN',
    "Avalanche" : 'AVL',
    "Base" : 'B',
    "Ethereum" : 'ETH',
    "Klaytn" : 'KLT',
    "Optimism" : 'OPT',
    "Polygon" : 'PLG',
    "Zora" : 'Z'
  }

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

  useEffect(()=>{
    fetch("https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json")
    .then((response)=>response.json())
    .then((data)=>{
      setObj(Object.values(data))
    })
  }, [])


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
            <div style={{ maxWidth: '100%', minWidth: '10%', maxHeight: '100%', minHeight: '10%' }}>
              <Image
                src={obj[value-1]?obj[value-1].image:null}
                style={{display : 'flex', height : '100%', width : '100%'}}
                onClick={handleImageClick}
              />
            </div>
          </div>
          <Accordion className='mt-3 mb-3' defaultActiveKey="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                {obj[value-1]?obj[value-1].description:null}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col >Contract Address</Col>
                  <Col >
                    {renderTooltip('wallet', '0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc',
                      <span>
                        0xb9A2196...40B7eC39C0cc
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
              {obj[value-1]?obj[value-1].name:null} #{value}
            </h1>
            <strong>Owned By </strong> Zawad
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
                  {obj[value-1]?obj[value-1].price:null} ETH &nbsp;
                  <span style={{ color: 'GrayText', fontSize: '15pt' }}>${obj[value-1]?obj[value-1].price*60:null}</span>
                </h2>

                <div className='mb-2 mt-3' style={{ width: '100%' }}>
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
            src={obj[value-1]?obj[value-1].image:null}
            width="100%"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NFTBuyPage;
