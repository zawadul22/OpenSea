import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./grid.css";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Context } from "./connectWallet";

function ProfileGrid({ page }) {
    const ctx = useContext(Context);
    let startIndex = 0;
    let endIndex = 0;
    const navigate = useNavigate();
    const [obj, setObj] = useState([]);
    const [tokenIDs, setTokenIDs] = useState([]);
    const [tokenIDLength, setTokenIDLength] = useState(0);
    const [objLength, setObjLength] = useState(0);
    const [available, setAvailable] = useState([]);
    const [availLength, setAvailLength] = useState(0);
    //console.log(data[0].image)

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
            "name": "_safeMint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "internalType": "string",
                    "name": "name_",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol_",
                    "type": "string"
                }
            ],
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
                }
            ],
            "name": "getAvailableMintsForUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ERC721.TokenBalanceModel[]",
                    "name": "",
                    "type": "tuple[]"
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
    ];

    const contractAddress = "0x2c097A15A70FFe623B13041d8aB4bb1BdaeF9829";
    const web3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com")
    );
    const contract = new web3.eth.Contract(abi, contractAddress);

    const shortForm = {
        Arbitrum: "ARB",
        "Arbitrum Nova": "ARBN",
        Avalanche: "AVL",
        Base: "B",
        Ethereum: "ETH",
        Klaytn: "KLT",
        Optimism: "OPT",
        Ploygon: "PLG",
        Zora: "Z",
    };

    useEffect(() => {
        fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                let dataArray = Object.values(data);
                setObj(dataArray);
                setObjLength(dataArray.length);
            });

        if (ctx.wallet.accounts[0]) {
            contract.methods
                .getAvailableMintsForUser(ctx.wallet.accounts[0])
                .call()
                .then((v) => {
                    console.log("getAvailableMintsForUser ",v)
                    setTokenIDs(v);
                    setTokenIDLength(v.length);
                });
        }
        // console.log(ctx.wallet.accounts)

    }, [ctx]);

    useEffect(() => {
        //console.log(tokenIDLength)
        //console.log(tokenIDs.length)
        if (tokenIDs.length !== 0) {
            //console.log("Checking tuple ", tokenIDs[1]) 
            //console.log("Checking inside tuple ", tokenIDs[1][1])
            let temp = [];
            for (let i = 0; i < tokenIDLength; i++) {
                if (tokenIDs[i][1] !== "0") {
                    temp.push(tokenIDs[i][0])
                }
            }

            console.log("Temp token", temp)

            setAvailable(temp);
            setAvailLength(temp.length);

        }
    }, [tokenIDs])

    //console.log("Token IDs ", tokenIDs);
    //console.log("Token IDs array length ", tokenIDLength);
    //console.log("Object Length ", objLength);
    //console.log("Object Array ", obj);


    if (tokenIDs !== 0) {
        if (tokenIDs < 8) {
            startIndex = (page - 1) * tokenIDs;
            endIndex = startIndex + tokenIDs;
        } else {
            startIndex = (page - 1) * 8;
            endIndex = startIndex + 8;
        }
    }

    console.log(ctx?.wallet?.accounts[0]);


    return (

        <Row xs={2} md={4} className="g-4">

            {Array.from({ length: availLength })
                .slice(startIndex, endIndex)
                .map((_, idx) => (
                    <>
                        {/* {console.log("Within the component ", obj[available[0] - 1], available[0], idx)} */}
                        <Col key={idx}>
                            <Card className='card-pointer' onClick={() => navigate(`/view/${available[startIndex + idx] - 1}`)}>
                                <Card.Img
                                    style={{ height: '400px', width: '305px' }}
                                    variant="top"
                                    src={obj[available[startIndex + idx] - 1] ? obj[available[startIndex + idx] - 1].image : null}
                                />

                                <Card.Body>
                                    <Card.Title><h3>{obj[available[startIndex + idx] - 1] ? obj[available[startIndex + idx] - 1].name : "Unknown"}</h3></Card.Title>

                                    <Card.Text>
                                        <Row md={2}>
                                            <Col className="d-flex align-items-start">
                                                <div style={{ fontSize: '15pt' }}>{obj[available[startIndex + idx] - 1] ? obj[available[startIndex + idx] - 1].price : "Unknown"} ETH</div>
                                            </Col>
                                            <Col className="d-flex align-items-end justify-content-end">
                                                {/* <Chip label='Zawad' style={{ backgroundColor: 'grey', color: 'white' }} /> */}
                                            </Col>
                                        </Row>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>
                ))}
        </Row>
    );
}

export default ProfileGrid;
