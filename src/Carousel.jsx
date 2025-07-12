import React, { useEffect, useState } from 'react'
import alhaitam from './assets/aBanner.jpg'
import neuvillete from './assets/nBanner.jpg'
import jhongli from './assets/jBanner.jpg'
import { motion } from 'motion/react'

const carouselArray = [alhaitam, neuvillete, jhongli];

const Carousel = React.memo(() => {
    const [currentImage, setCurrentImage] = useState(alhaitam);
    useEffect(() => {
      let i = 0;  
      const Interval = setInterval(() => {
        setCurrentImage(carouselArray[i%3]);
        i++;
        console.log("Image changes at seconds: ", i);
      }, 5000);
    
      return () => {
        clearInterval(Interval); 
      }
    }, [])
    
  return (
    <div>
      <div>
        <motion.img
          key = {currentImage}
          src={currentImage}
          alt=""
          initial={{
            x: "-100vw",
          }}
          animate={{
            scale: 1,
            x: 0
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          exit={{
            x: "100vh"
          }}
        />
      </div>
    </div>
  );
});

export default Carousel
