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

  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;
  const navigate = useNavigate();
  const [obj, setObj] = useState([]);
  //console.log(data[0].image)

  useEffect(() => {
    //let ignore = false;

      fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        setObj(Object.values(data))
        
      })
      .catch((error)=>{
        console.error(error)
      })
    
  }, [])

  console.log(obj);


  const cards = Array.from({ length: 63 })
    .slice(startIndex, endIndex)
    .map((_, idx) => (
      <>
      {console.log(idx)}
      
      <Col key={idx}>
        <Card className='card-pointer' onClick={() => navigate(`/buy/${idx+1}`)}>
          <Card.Img variant="top" src={nft} />
          <Card.Body>
            <Card.Title><h3>Bored Fox</h3></Card.Title>
            <Card.Text>
              <Row md={2}>
                <Col className="d-flex align-items-start">
                  <div style={{ fontSize: '15pt' }}>0.01 ETH</div>
                </Col>
                <Col className="d-flex align-items-end justify-content-end">
                  {/* <Button variant='secondary' size='sm' style={{pointerEvents:'none', cursor:'not-allowed'}}>Zawad</Button> */}
                  <Chip label='Zawad' style={{ backgroundColor: 'grey', color: 'white'}}/>
                </Col>
              </Row>

            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      </>
    ));

  return (
    <Row xs={2} md={4} className="g-4">
      {cards}
    </Row>
  );
}

export default Grid;