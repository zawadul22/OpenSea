import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import nft from './assets/nft-image-2.png'
import { useNavigate } from 'react-router-dom';
import './grid.css'
import { Button, Container } from 'react-bootstrap';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

function Grid({ page }) {

  let startIndex = 0;
  let endIndex = 0;
  const navigate = useNavigate();
  const [obj, setObj] = useState([]);
  const [objLength, setObjLength] = useState(0);
  //console.log(data[0].image)


  useEffect(() => {

    fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
      .then((res) => res.json())
      .then((data) => {

        //console.log(data)
        let dataArray = Object.values(data)
        setObj(dataArray)
        setObjLength(dataArray.length)
        console.log(objLength)

      })

  }, [])

  console.log(obj);

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
  return (
    <Row xs={2} md={4} className="g-4">
      {Array.from({ length: objLength })
        .slice(startIndex, endIndex)
        .map((_, idx) => (
          <>
            <Col key={idx}>
              <Card className='card-pointer' onClick={() => navigate(`/buy/${idx + startIndex + 1}`)}>
                <Card.Img
                  variant="top"
                  src={obj[startIndex + idx] ? obj[startIndex + idx].image : null}
                />

                <Card.Body>
                  <Card.Title><h3>{obj[startIndex + idx].name}</h3></Card.Title>
                  
                  <Card.Text>
                    <Row md={2}>
                      <Col className="d-flex align-items-start">
                        <div style={{ fontSize: '15pt' }}>{obj[idx].price}</div>
                      </Col>
                      <Col className="d-flex align-items-end justify-content-end">
                        {/* <Button variant='secondary' size='sm' style={{pointerEvents:'none', cursor:'not-allowed'}}>Zawad</Button> */}
                        <Chip label='Zawad' style={{ backgroundColor: 'grey', color: 'white' }} />
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