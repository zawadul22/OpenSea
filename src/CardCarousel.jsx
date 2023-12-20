import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nft from './assets/nft-image-2.png';
import './Carousel.css';
import Web3 from 'web3';
import left from './assets/left-arrow.svg'
import right from './assets/right-arrow.svg'
import { useNavigate } from 'react-router-dom';
import './Carousel.css'
import { Card, Col, Row } from "react-bootstrap";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (

        <div className="next" onClick={onClick}>
            <img src={right} className="svg-prop" />
            {/* <svg xmlns={right} className="svg-prop" /> */}
        </div>


        // <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "red" }}
        //     onClick={onClick}
        // />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (

        <div className="prev" onClick={onClick}>
            <img src={left} className="svg-prop" />
            {/* <svg xmlns={left} className="svg-prop" /> */}
        </div>


        // <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "green" }}
        //     onClick={onClick}
        // />
    );
}


const NFTCarouselCard = (props) => {

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    };
    return (
        <div id="container" >
            <h4>{props.title}</h4>

            <Slider {...settings}>
                {Array.from({ length: 10 })
                    .map((_, index) => (
                        <div className="slide-wrapper">
                            {/* <figure className="img-part">
                                <img className="slider-img" src={obj?.[index]?.image} style={{ margin: '0 auto' }} />
                                <div className="overlay-image-text" >
                                    <p style={{ fontWeight: '600', fontSize: '15pt' }}> {obj?.[index]?.name}</p>
                                    <p style={{ fontWeight: '540', fontSize: '10pt' }}> {obj?.[index]?.price} DD</p>
                                </div>
                            </figure> */}
                            <Card className="card-pointer2">
                                <Card.Img
                                    id="card-img"
                                    src={nft}
                                    variant="top"
                                />
                                <Card.Body>
                                    <Card.Title>Bored Fox</Card.Title>
                                    <Card.Text className="nft-price-card">
                                        10 DD Coin
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

            </Slider>


        </div>

    );
}

export default NFTCarouselCard;