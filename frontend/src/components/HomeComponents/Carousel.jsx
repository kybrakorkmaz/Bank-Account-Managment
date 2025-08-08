import React from "react";
import carouselImage1 from "../../assets/Images/onlinebanking1.jpg";
import carouselImage2 from "../../assets/Images/onlinebanking2.jpg";
import carouselImage3 from "../../assets/Images/onlinebanking3.jpg";
const slides = [
    {
        image: carouselImage1,
        title: "Online Banking",
        caption: "Control your account everywhere.",
        interval: 10000,
        alt: "Online banking image",
    },
    {
        image: carouselImage2,
        title: "One Tap Payment",
        caption:
            "IBank has a lot more to offer, with its variant features, IBANK is the only one of its kind app.",
        interval: 2000,
        alt: "One tap payment image",
    },
    {
        image: carouselImage3,
        title: "More Secure",
        caption: "With 2FA, your account is in reliable hands.",
        alt: "Security image",
    },
];
function Carousel() {
    return (
        <div className="carousel-wrapper">
            <div id="HomePageCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#HomePageCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-item${index === 0 ? " active" : ""}`}
                            data-bs-interval={slide.interval}
                        >
                            <img
                                src={slide.image}
                                className="d-block w-100"
                                alt={slide.alt}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{slide.title}</h5>
                                <p>{slide.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#HomePageCarousel"
                    data-bs-slide="prev"
                >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#HomePageCarousel"
                    data-bs-slide="next"
                >
                    <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;
