import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import ExampleCarouselImage from "./components/ExampleCarouselImage";

import img1 from "./components/img1.jpg";
import img2 from "./components/img22.jpg";
import img3 from "./components/img3.jpg";

function UncontrolledExample() {
    return (
        <div 
            style={{ 
                width: "100vw", 
                minHeight: "200vh", 
                position: "absolute",
                top: 0, 
                left: 0, 
                margin: 0, 
                padding: 0,
                overflow: "hidden",
                zIndex: -1  
            }}
        >
            <Carousel style={{ width: "100%", height: "100%" }}>
                <Carousel.Item>
                    <ExampleCarouselImage
                        src={img1}
                        alt="First Slide"
                        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
                    />
                    <Carousel.Caption
    style={{
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "80%",
        //backgroundColor: "rgba(255, 255, 255, 0.6)", // Optional for readability
        borderRadius: "10px", 
        padding: "10px",
    }}
>
    <h3
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Your AI-Powered Learning Companion
    </h3>
    <p
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Master any topic with AI-driven summaries, personalized study plans, and interactive quizzes—all in one place.
    </p>
</Carousel.Caption>

                </Carousel.Item>

                <Carousel.Item>
                    <ExampleCarouselImage
                        src={img2}
                        alt="Second Slide"
                        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
                    />
                    <Carousel.Caption
    style={{
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "80%",
        borderRadius: "10px", 
        padding: "10px",
    }}
>
    <h3
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Learn Smarter, Not Harder
    </h3>
    <p
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Use speech-to-text, multilingual translation, and AI-generated roadmaps to simplify your learning journey.
    </p>
</Carousel.Caption>

                </Carousel.Item>

                <Carousel.Item>
                    <ExampleCarouselImage
                        src={img3}
                        alt="Third Slide"
                        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
                    />
                    <Carousel.Caption
    style={{
        position: "absolute",
        top: "60%", //top gap
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "80%",
        borderRadius: "10px", 
        padding: "10px",
    }}
>
    <h3
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Track Progress & Earn Rewards
    </h3>
    <p
        style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            textShadow: "2px 2px 4px white",
            padding: "5px",
        }}
    >
        Monitor your searches, quiz attempts, and study history while earning badges for your achievements.
        </p>
</Carousel.Caption>

                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default UncontrolledExample;

                       