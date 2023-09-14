import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import nft from './assets/nft-image-2.png'
import { useNavigate } from 'react-router-dom';
import './grid.css'
import { Start } from '@mui/icons-material';
import { Last } from 'react-bootstrap/esm/PageItem';
import { Button, Container } from 'react-bootstrap';

function Grid({ page }) {
  // Calculate the range of cards to display based on the current page
  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;
  const navigate = useNavigate();

  // Generate cards for the current page
  const cards = Array.from({ length: 63 })
    .slice(startIndex, endIndex)
    .map((_, idx) => (
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
                  <Button variant='secondary' size='sm' style={{pointerEvents:'none', cursor:'not-allowed'}}>Zawad</Button>
                </Col>
              </Row>

            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));

  return (
    <Row xs={2} md={4} className="g-4">
      {cards}
    </Row>
  );
}

export default Grid;