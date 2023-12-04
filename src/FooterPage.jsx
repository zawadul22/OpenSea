import { Button, Form } from 'react-bootstrap';
import './FooterPage.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import discord from './assets/discord-icon.svg';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="footer-content">
                <div className='row-container'>
                    <div className='signup'>
                        <h5 className='title1'>Stay in the loop</h5>
                        <p className='description'>
                            Join our mailing list to stay in the loop with our
                            newest feature releases, NFT drops, and tips and
                            tricks for navigating Jasmy Market Place.
                        </p>

                        <div style={{display : 'flex'}}>
                            <Form.Control type='text' size='lg' placeholder='Enter your email address' className='signup-form' />
                            <Button size='lg' className='signup-button'>Sign Up</Button>
                        </div>

                    </div>
                    <div className='socials'>
                        <h5 className='title1'>Join the community</h5>
                        <div className='social-icons'>
                            <Button size='lg' className='social-icon'> <TwitterIcon /> </Button>
                            <Button size='lg' className='social-icon'> <InstagramIcon /> </Button>
                            <Button size='lg' className='social-icon'> <RedditIcon /> </Button>
                            <Button size='lg' className='social-icon'> <YouTubeIcon /> </Button>
                            <Button size='lg' className='social-icon'> <MailOutlineIcon /> </Button>
                            <Button size='lg' > <svg xmlns='discord' style={{height : '25px' , width : '25px', fill : 'white'}}/> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;