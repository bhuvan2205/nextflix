import React from "react";
import CarouselItem from "./CarouselItem";
import Link from "next/link";

const Carousel = ({ videos = [], size, title }) => {
  return (
    <>
      <h1 className="my-8 px-8 sm:px-0 text-4xl text-white font-serif font-extrabold">
        {title}
      </h1>
      <div className="carousel carousel-center flex-col sm:flex-row mx-auto w-screen items-center gap-4 overflow-y-scroll h-[500px] sm:h-auto">
        {videos?.map((item, index) => {
          return (
            <Link href={`/video/${item.id}`}>
              <CarouselItem
                key={item?.id || index}
                imgUrl={item?.image}
                size={size}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
