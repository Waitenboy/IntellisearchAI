import React from "react";

function ExampleCarouselImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="d-block w-100"
      style={{ height: "500px", objectFit: "cover" }} // Adjust height as needed
    />
  );
}

export default ExampleCarouselImage;
