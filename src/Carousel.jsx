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
        slidesToScroll: 4,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };
    return (
        <div id="container" >
            <h2> Multiple items </h2>
            <Slider {...settings}>

                {Array.from({ length: 16 })
                    .map((_, index) => (
                        <div className="hover01 column container2">


                            <figure className="z-3">
                                <img className="image background-image " src={nft} style={{ margin: '0 auto' }} />

                            </figure>
                            <div className="z-3 text overlay-text" >
                                <h1>Hello</h1>
                            </div>
                        </div>
                    ))}

            </Slider>


        </div>

    );
}

export default NFTCarousel;