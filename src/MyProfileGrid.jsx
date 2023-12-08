import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./grid.css";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Context } from "./connectWallet";
import { abi } from "./ABI";

function ProfileGrid({ page }) {
    const ctx = useContext(Context);
    let startIndex = 0;
    let endIndex = 0;
    const navigate = useNavigate();
    const [obj2, setObj2] = useState([]);
    const [tokenIDs, setTokenIDs] = useState([]);
    const [tokenIDLength, setTokenIDLength] = useState(0);
    const [available, setAvailable] = useState([]);
    const [availLength, setAvailLength] = useState(0);
    const [uri, setUri] = useState([]);

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_HOST));
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

        if (ctx.wallet.accounts[0]) {
            contract.methods
                .getAvailableMintsForUser(ctx.wallet.accounts[0])
                .call()
                .then((v) => {
                    console.log("getAvailableMintsForUser ", v)
                    setTokenIDs(v);
                    setTokenIDLength(v.length);
                });
        }

    }, [ctx]);

    useEffect(() => {
        contract.methods.getUriList().call()
            .then((v) => {
                setUri(v);
                setObjLength2(v.length);
            })
            .catch((e) => console.error(e));

    }, []);

    useEffect(() => {

        if (uri) {

            Promise.all(uri.map((url) =>
                fetch(url).then((res) => res.json())))
                .then((data) => {
                    console.log(" response data", data);
                    setObj2(data);
                })
                .catch((error) => console.error(error));
        }

    }, [uri])


    useEffect(() => {

        if (tokenIDs.length !== 0) {

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
                            <Card className='card-pointer' onClick={() => navigate(`/view/${available[startIndex + idx]}`)}>
                                <Card.Img
                                    // style={{ height: '300px', width: '305px' }}
                                    variant="top"
                                    src={obj2[available[startIndex + idx] - 1] ? obj2[available[startIndex + idx] - 1].image : null}
                                />

                                <Card.Body>
                                    <Card.Title><h4>{obj2[available[startIndex + idx] - 1] ? obj2[available[startIndex + idx] - 1].name : "Unknown"}</h4></Card.Title>

                                    <Card.Text>
                                        <Row md={2}>
                                            <Col className="d-flex align-items-start">
                                                <div style={{ fontSize: '12pt' }}>{obj2[available[startIndex + idx] - 1] ? obj2[available[startIndex + idx] - 1].price : "Unknown"} DD</div>
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
