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
import { abi } from "./ABI";

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


const NFTCarousel = () => {

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_HOST));

    const contract = new web3.eth.Contract(abi, contractAddress);

    const [obj, setObj] = useState([]);
    const [objLength, setObjLength] = useState(0);
    const [uri, setUri] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        contract.methods.getUriList().call()
            .then((v) => {
                console.log(v);
                setUri(v);
                setObjLength(v.length);
            })
            .catch((e) => console.error(e));

    }, []);

    useEffect(() => {

        if (uri) {

            Promise.all(uri.map((url) =>
                fetch(url).then((res) => res.json())))
                .then((data) => {
                    console.log(" response data", data);
                    setObj(data);
                })
                .catch((error) => console.error(error));
        }

    }, [uri])

    const settings = {
        // dots: true,
        infinite: false,
        loop: true,
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

            <Slider {...settings}>
                {Array.from({ length: objLength })
                    .map((_, index) => (
                        <div onClick={() => { navigate(`/buy/${index + 1}`) }}>
                            <figure className="fig-part">
                                <img className="img-part" src={obj?.[index]?.image} />
                                <div className="overlay-image-text" >
                                    <p className="nft-name"> {obj?.[index]?.name}</p>
                                    <p className="nft-price"> {obj?.[index]?.price} DD</p>
                                </div>
                            </figure>
                        </div>
                    ))}

            </Slider>

        </div>

    );
}

export default NFTCarousel;