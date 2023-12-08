import { Button, Form } from 'react-bootstrap';
import favicon from './assets/favicon.png'
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

                        <div className='signup-text'>
                            <Form.Control type='text' placeholder='Enter your email address' className='signup-form' />
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
                        </div>
                    </div>
                </div>
                <div className='row-container'>
                    <div className='outro'>
                        <img className='outro-logo' src={favicon} />
                        <h5 className='title2'>Jasmy Market Place</h5>
                        <p>
                            The world's first and largest digital marketplace for
                            crypto collectibles and non-fungible tokens (NFTs).
                            Buy, sell, and discover exclusive digital items.
                        </p>
                    </div>
                    <div className='links'>
                        <div className='link-list'>
                            <div className='title3'>Marketplace</div>
                            <ul className='custom-list'>
                                <li className='list-item'>Art</li>
                                <li className='list-item'>Gaming</li>
                                <li className='list-item'>Memberships</li>
                                <li className='list-item'>PFPs</li>
                                <li className='list-item'>Photography</li>
                                <li className='list-item'>Music</li>
                            </ul>
                        </div>
                        <div className='link-list'>
                            <div style={{ marginBottom: '40pt' }}>
                                <div className='title3'>Account</div>
                                <ul className='custom-list'>
                                    <li className='list-item'>Profile</li>
                                    <li className='list-item'>Favorites</li>
                                    <li className='list-item'>Watchlist</li>
                                    <li className='list-item'>Studio</li>
                                    <li className='list-item'>Jasmy Pro</li>
                                    <li className='list-item'>Settings</li>
                                </ul>
                            </div>
                            <div>
                                <div className='title3'>Stats</div>
                                <ul className='custom-list'>
                                    <li className='list-item'>Rankings</li>
                                    <li className='list-item'>Activity</li>
                                </ul>
                            </div>
                        </div>
                        <div className='link-list'>
                            <div className='title3'>Resources</div>
                            <ul className='custom-list'>
                                <li className='list-item'>Blog</li>
                                <li className='list-item'>Learn</li>
                                <li className='list-item'>Help Center</li>
                                <li className='list-item'>Community Standards</li>
                                <li className='list-item'>Taxes</li>
                                <li className='list-item'>Partners</li>
                                <li className='list-item'>Developer platform</li>
                                <li className='list-item'>Platform status</li>
                            </ul>
                        </div>
                        <div className='link-list'>
                            <div style={{ marginBottom: '40pt' }}>
                                <div className='title3'>Company</div>
                                <ul className='custom-list'>
                                    <li className='list-item'>About</li>
                                    <li className='list-item'>Careers</li>
                                    <li className='list-item'>Ventures</li>

                                </ul>
                            </div>
                            <div>
                                <div className='title3'>Learn</div>
                                <ul className='custom-list'>
                                    <li className='list-item'>What is an NFT?</li>
                                    <li className='list-item'>How to buy an NFT?</li>
                                    <li className='list-item'>What are NFT drops?</li>
                                    <li className='list-item'>How to sell NFT using Jasmy Market Place?</li>
                                    <li className='list-item'>How to create an NFT on Jasmy Market Place?</li>
                                    <li className='list-item'>What is a crypto wallet?</li>
                                    <li className='list-item'>What is crypto currency?</li>
                                    <li className='list-item'>What are blockchain gas fees?</li>
                                    <li className='list-item'>What is a blockchain?</li>
                                    <li className='list-item'>What is Web3?</li>
                                    <li className='list-item'>How to stay protected in web3?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='last-line'>
                    <div>
                        © 2018 - 2023 Jasmy Labo, Inc
                    </div>
                    <div>
                        Privacy Policy
                        <span style={{ marginLeft: '25pt' }}>Terms of Service</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;