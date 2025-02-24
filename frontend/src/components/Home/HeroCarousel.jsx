import { useState, useEffect } from "react";
import axios from "axios";

const HeroCarousel = () => {
    const [carousels, setCarousels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch carousel data from the backend
    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/carousel/");
                setCarousels(response.data);
            } catch (error) {
                console.error("Error fetching carousels", error);
            }
        };
        fetchCarousels();
    }, []);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [carousels]);

    // Handle next and previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carousels.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
    };

    if (carousels.length === 0) return null;

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-gray-200">
            {carousels.map((carousel, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-between px-32 transition-opacity duration-700 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: carousel.bgColor }}
                >
                    {/* Left Content */}
                    <div className="w-1/2 ">
                        <h1 className="text-3xl tracking-tight " style={{ color: carousel.headingColor }}>
                            {carousel.heading}
                        </h1>
                        <p className="lg:text-8xl md:text-5xl mt-2 font-bold tracking-tight" style={{ color: carousel.subheadingColor }}>
                            {carousel.subheading}
                        </p>
                        <h2 className="text-xl mt-2 tracking-tight " style={{ color: carousel.titleColor }}>
                            {carousel.title}
                        </h2>
                        <a
                            href={carousel.buttonLink}
                            className="inline-block mt-4 px-6 py-2 rounded-md font-semibold transition duration-300"
                            style={{
                                backgroundColor: carousel.buttonBgColor,
                                color: carousel.buttonTextColor,
                            }}
                        >
                            {carousel.buttonText}
                        </a>
                    </div>

                    {/* Right Image */}
                    <div className="w-1/2 flex justify-center">
                        <img src={carousel.imageUrl} alt="Carousel" className="max-w-md rounded-md " />
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full"
            >
                ❯
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carousels.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? "bg-black w-6" : "bg-gray-400"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
