import React from "react";
import CarouselItem from "./CarouselItem";

const Carousel = ({ videos = [], size, title }) => {
  return (
    <>
      <h1 className="my-8 text-4xl text-white font-serif font-extrabold">
        {title}
      </h1>
      <div className="carousel carousel-center">
        {videos.map((item, index) => {
          return (
            <CarouselItem
              key={item?.id || index}
              imgUrl={item?.image}
              size={size}
            />
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
