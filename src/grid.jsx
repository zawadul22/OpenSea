import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import './grid.css'
import { useEffect, useState } from 'react';

function Grid({ page }) {

  let startIndex = 0;
  let endIndex = 0;
  const navigate = useNavigate();
  const [obj, setObj] = useState([]);
  const [objLength, setObjLength] = useState(0);
  //console.log(data[0].image)


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

    fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
      .then((res) =>res.json())
      .then((data) => {
        
          console.log(data)
          let dataArray = Object.values(data)
          setObj(dataArray)
          setObjLength(dataArray.length)

        
      })

  }, [])


  if (objLength !== 0) {
    if (objLength < 8) {
      startIndex = (page - 1) * objLength;
      endIndex = startIndex + objLength;
    }
    else {
      startIndex = (page - 1) * 8;
      endIndex = startIndex + 8;
    }
  }

  console.log("startIndex",startIndex,endIndex);
  console.log(endIndex)
  return (
    <Row xs={2} md={4} className="g-4">
      {Array.from({ length: objLength })
        .slice(startIndex, endIndex)
        .map((_, idx) => (
          <>
            <Col key={idx}>
              <Card className='card-pointer' onClick={() => navigate(`/buy/${idx + startIndex + 1}`)}>
                <Card.Img
                  style={{ height: '400px', width: '305px' }}
                  variant="top"
                  src={obj[startIndex + idx] ? obj[startIndex + idx].image : null}
                  // src='https://firebasestorage.googleapis.com/v0/b/nftsv2-4d9c1.appspot.com/o/property%2Fa993207b-fc77-49e1-b9cd-a255f97bf1ed?alt=media&token=f5146c8c-0b99-40d2-bded-a21c4e5e25f1'
                />

                <Card.Body>
                  <Card.Title><h3>{obj[startIndex + idx].name}</h3></Card.Title>
                  {/* <Card.Title><h3>Wintos {idx+1}</h3></Card.Title> */}

                  <Card.Text>
                    <Row md={2}>
                      <Col className="d-flex align-items-start">
                        <div style={{ fontSize: '15pt' }}>{obj[idx].price} JASMY</div>
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