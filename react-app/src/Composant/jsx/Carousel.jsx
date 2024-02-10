import React, { useState } from 'react';
import { LiaAngleRightSolid, LiaAngleLeftSolid } from "react-icons/lia";
import './../css/Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (images && images.length > 0) {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  const prevSlide = () => {
    if (images && images.length > 0) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    }
  };

  return (

    <div className='carousel-container'>
      <div className='box-container-img' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images != null ?
          images.map((image, index) => (
            <div className='img-container' key={image.id}>
              <img src={image.url} alt={`Slide ${index + 1}`} />
            </div>
          ))
          : ''}

      </div>
      <div className='button-prev' onClick={prevSlide}><LiaAngleLeftSolid /></div>
      <div className='button-next' onClick={nextSlide}><LiaAngleRightSolid /></div>
    </div>

  );
};

export default Carousel;
