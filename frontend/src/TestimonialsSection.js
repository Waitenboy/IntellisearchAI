import Carousel from 'react-bootstrap/Carousel';
import img1 from "./components/img41.jpg";
import img2 from "./components/img51.jpg";
import img3 from "./components/img61.jpg";

function CarouselFadeExample() {
    return (
        <Carousel fade style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
            {/* Slide 1 */}
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                    style={{ width: "100%", height: "80vh", objectFit: "contain" }}
                />
                <Carousel.Caption
                    style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",  // Full width of the viewport
                        backgroundColor: "rgba(0, 0, 0, 0.6)",  // Dark semi-transparent background
                        padding: "20px 40px",
                        textAlign: "center",
                        fontFamily:"monospace"
                    }}
                >
                    <h3 style={{ color: "white", fontWeight: "bold" }}>"A Game-Changer for Research!"</h3>
                    <h5 style={{ color: "#f0e68c" }}>Sarah Thompson, Data Analyst</h5>
                    <p style={{ color: "white", fontSize: "16px", lineHeight: "1.5", maxWidth: "800px", margin: "0 auto" }}>
                        "This platform has completely transformed the way I search for information. 
                        The AI-powered insights save me hours of manual work, and the personalized results are spot on!"
                    </p>
                </Carousel.Caption>

            </Carousel.Item>

            {/* Slide 2 */}
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                    style={{ width: "100%", height: "80vh", objectFit: "contain" }}
                />
                <Carousel.Caption
                    style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",  // Full width of the viewport
                        backgroundColor: "rgba(0, 0, 0, 0.6)",  // Dark semi-transparent background
                        padding: "20px 40px",
                        textAlign: "center",
                        fontFamily:"monospace"
                    }}
                >
                    <h3 style={{ color: "white", fontWeight: "bold" }}> "Seamless and Intuitive!"</h3>
                    <h5 style={{ color: "#f0e68c" }}>Emily Carter, University Professor</h5>
                    <p style={{ color: "white", fontSize: "16px", lineHeight: "1.5", maxWidth: "800px", margin: "0 auto" }}>
                    "The user-friendly design and intelligent recommendations make this an essential tool for students and professionals alike. Highly recommended!"


                    </p>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Slide 3 */}
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                    style={{ width: "100%", height: "80vh", objectFit: "contain" }}
                />
                <Carousel.Caption
                    style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",  // Full width of the viewport
                        backgroundColor: "rgba(0, 0, 0, 0.6)",  // Dark semi-transparent background
                        padding: "20px 40px",
                        textAlign: "center",
                        fontFamily:"monospace"
                    }}
                >
                    <h3 style={{ color: "white", fontWeight: "bold" }}>"Incredible AI Accuracy!"</h3>
                    <h5 style={{ color: "#f0e68c" }}> James Rodriguez, Tech Enthusiast</h5>
                    <p style={{ color: "white", fontSize: "16px", lineHeight: "1.5", maxWidth: "800px", margin: "0 auto" }}>
                    "I've tried many search tools, but this one stands out! The AI not only finds relevant results but also provides summaries that help me grasp information faster."


                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;
