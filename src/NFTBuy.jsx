import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import nft from './assets/nft-image-2.png'
import react from './assets/react.svg'
import './NFTBuy.css'
import Button from 'react-bootstrap/Button';

function NFTBuyPage() {
    return (
        <>
            <div className='container'>
                <div className="side">
                    <Image src={nft} width="90%" rounded />
                </div>
                <div className="side side-content-center">
                    <div>
                        <h1>Bored Fox</h1>
                        <strong>Owned By </strong> Zawad
                        <h3 className='mt-1' style={{ color: 'GrayText' }}>0.01 ETH</h3>
                        <div className='d-grid gap-2'>
                            <Button variant='primary' size='lg'> Buy Now</Button>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default NFTBuyPage;