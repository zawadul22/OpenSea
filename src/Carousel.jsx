import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nft from './assets/nft-image-2.png';
import './Carousel.css';

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
        />
    );
}

const NFTCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };
    return (
        <div className="container" style={{justifyContent : 'center'}}>
            <h2> Multiple items </h2>
            <Slider {...settings}>

                {Array.from({ length: 7 })
                    .map((_, index) => (
                        <div id = "nft-image" style={{onMouseOver:"this.style.color='red'"}}>
                            <img src = {nft} style={{height : '320px'}}/>
                            {/* <div className="bg-one"></div> */}
                        </div>
                    ))}

            </Slider>
        </div>
    );
}

export default NFTCarousel;