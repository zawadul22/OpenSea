import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import nft from './assets/nft-image-2.png'
import { useNavigate } from 'react-router-dom';
import './grid.css'

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
          <Card className='card-pointer' onClick={()=> navigate('/buy')}>
            <Card.Img variant="top" src={nft} />
            <Card.Body>
              <Card.Title>Bored Fox</Card.Title>
              <Card.Text>0.01 ETH</Card.Text>
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