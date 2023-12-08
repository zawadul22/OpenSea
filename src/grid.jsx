import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import './grid.css'
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import wintos from './assets/Wintos.png'
import { abi } from './ABI';

function Grid({ page }) {

  let startIndex = 0;
  let endIndex = 0;
  const navigate = useNavigate();
  const [obj2, setObj2] = useState([]);
  const [objLength2, setObjLength2] = useState(0);
  const [uri, setUri] = useState([]);

  const contractAddress = "0x273CAF0243FE546cb35b5245de53c7Bd70837E54";
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  const contract = new web3.eth.Contract(abi, contractAddress);


  const shortForm = {
    'Arbitrum': 'ARB',
    'Arbitrum Nova': 'ARBN',
    'Avalanche': 'AVL',
    'Base': 'B',
    'Ethereum': 'ETH',
    'Klaytn': 'KLT',
    'Optimism': 'OPT',
    'Ploygon': 'PLG',
    'Zora': 'Z'
  }


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

  console.log("Checking obj2 ", obj2?.[0]?.price, "and length ", objLength2);


  if (objLength2 !== 0) {
    if (objLength2 < 8) {
      startIndex = (page - 1) * objLength2;
      endIndex = startIndex + objLength2;
    }
    else {
      startIndex = (page - 1) * 8;
      endIndex = startIndex + 8;
    }
  }

  //console.log("startIndex", startIndex, endIndex);
  //console.log(endIndex)
  return (
    <Row xs={2} md={4} className="g-4">
      {Array.from({ length: objLength2 })
        .slice(startIndex, endIndex)
        .map((_, idx) => (
          <>

            <Col key={idx}>
              <Card className='card-pointer' onClick={() => navigate(`/buy/${idx + startIndex + 1}`)}>
                <Card.Img
                  style={{ height: '400px', width: '305px' }}
                  variant="top"
                  // src={obj2[startIndex + idx] ? obj2[startIndex + idx].image : null}
                  src={obj2?.[startIndex + idx]?.image}
                // src = {wintos}
                />

                <Card.Body>
                  {/* <Card.Title><h3>{obj[startIndex + idx].name}</h3></Card.Title> */}
                  <Card.Title><h3>{obj2?.[startIndex + idx]?.name}</h3></Card.Title>
                  {/* <Card.Title><h3>Wintos {idx+1}</h3></Card.Title> */}
                  <Card.Text>
                    <Row md={2}>
                      <Col className="d-flex align-items-start">
                        {/* <div style={{ fontSize: '15pt' }}>{obj[startIndex + idx].price} JASMY</div> */}
                        <div style={{ fontSize: '15pt' }}>{obj2?.[startIndex + idx]?.price} DD Coin</div>
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

export default Grid;