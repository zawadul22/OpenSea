import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import nft from './assets/nft-image-2.png'

function Grid() {
    return (
        <Row xs={1} md={4} className="g-4" >
            {Array.from({ length: 16 }).map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Card.Img variant="top" src={nft} />
                        <Card.Body>
                            <Card.Title>Bored Fox</Card.Title>
                            <Card.Text>
                                0.01 ETH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Grid;